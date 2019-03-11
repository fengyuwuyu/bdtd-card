package com.bdtd.card.socket.base.service;

import java.lang.reflect.InvocationTargetException;
import java.net.InetSocketAddress;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bdtd.card.common.base.model.BdtdError;
import com.bdtd.card.common.base.model.BdtdModule;
import com.bdtd.card.socket.base.callback.AsyncCallback;
import com.bdtd.card.socket.base.command.ICommand;
import com.bdtd.card.socket.base.exception.IllegalOperateException;
import com.bdtd.card.socket.base.exception.NetUnknowException;
import com.bdtd.card.socket.base.invoke.IInvoke;
import com.bdtd.card.socket.base.model.CommandCategory;
import com.bdtd.card.socket.base.model.InvokeMetadata;
import com.bdtd.card.socket.base.model.MethodCommand;
import com.bdtd.card.socket.base.promise.BdtdPromise;
import com.bdtd.card.socket.base.utils.NetworkUtil;

import io.netty.channel.ChannelHandlerContext;

@SuppressWarnings({ "unchecked", "rawtypes" })
public abstract class AbstractNetService implements INetService {
	
	private final Logger log = LoggerFactory.getLogger(getClass());
	
	protected int nodeId;
	protected InetSocketAddress address;
	
	private Map<BdtdModule, InvokeMetadata> invokeMap = new HashMap<>();
	private ConcurrentHashMap<String, AsyncCallback> callbackMap = new ConcurrentHashMap<>();
	private ConcurrentHashMap<BdtdModule, IInvoke> clientInvokeMap = new ConcurrentHashMap<>();
	private ConcurrentHashMap<BdtdModule, IInvoke> serverInvokeMap = new ConcurrentHashMap<>();

	@Override
	public void registerServer(IInvoke... servers) {
		registerInvoke(serverInvokeMap, servers);
		registerInvokeMetadata(servers);
	}

	private void registerInvokeMetadata(IInvoke[] servers) {
		for (IInvoke server : servers) {
			BdtdModule key = server.getMetadata().getModule();
			if (invokeMap.put(key, server.getMetadata()) != null) {
				throw new IllegalArgumentException(String.format("InvokeMetadata[%s]被重复注册", server.getMetadata().getName()));
			}
		}
	}

	@Override
	public void registerClient(IInvoke... clients) {
		registerInvoke(clientInvokeMap, clients);
	}
	
	private void registerInvoke(ConcurrentHashMap<BdtdModule, IInvoke> map, IInvoke... invokes) {
		for (IInvoke invoke : invokes) {
			BdtdModule key = invoke.getMetadata().getModule();
			if (serverInvokeMap.put(key, invoke) != null) {
				throw new IllegalArgumentException(String.format("Invoke[%s]被重复注册", invoke.getMetadata().getName()));
			}
		}
	}
	
	private <R> AsyncCallback getAsyncCallback(ICommand<R> command) {
		return callbackMap.get(command.getCommandKey());
	}

	@Override
	public <T, R> void cacheCallback(ICommand<T> command, AsyncCallback<R> callback) {
		if (callback == null) {
			return ;
		}
		String key = command.getCommandKey();
		AsyncCallback<R> old = callbackMap.putIfAbsent(key, callback);
		if (old != null) {
			throw new NetUnknowException(BdtdError.DUPLICATE_COMMAND_KEY);
		}
	}

	@Override
	public void start() {
		if (!checkRegistInvoke()) {
			throw new RuntimeException("请注册客户端或服务器端");
		}
		
		this.startNetty();
	}

	private boolean checkRegistInvoke() {
		return serverInvokeMap.size() == 0 && clientInvokeMap.size() == 0;
	}

	@Override
	public <T> void dealCommand(ChannelHandlerContext ctx, ICommand<T> command) {
		BdtdModule module = BdtdModule.getModule(command.getModuleId());
		if (module == null) {
			throw new IllegalOperateException(BdtdError.MODULE_NOT_EXIST.getMessage());
		}
		
		CommandCategory category = command.getCommandCategory();
		switch (category) {
		case REQUEST:
			dealRequest(ctx, command, module);
			break;
		case RESPONSE:
			dealResponse(command);
			break;
		case PUBLISH:
			dealPublish(command, module);
			break;
		default:
			throw new IllegalOperateException(BdtdError.COMMAND_CATEGORY_NOT_EXIST);
		}
		
	}
	
	/**
	 * 服务器端处理收到的请求
	 * @param command
	 * @param module
	 */
	private <T, R> void dealRequest(ChannelHandlerContext ctx, ICommand<T> command, BdtdModule module) {
		IInvoke server = serverInvokeMap.get(module);
		if (server == null) {
			throw new IllegalOperateException(BdtdError.SERVER_MODULE_NOT_REGIST);
		}
		
		InvokeMetadata metadata = this.invokeMap.get(module);
		if (metadata == null) {
			throw new IllegalOperateException(BdtdError.INVOKE_METADATA_NOT_REGIST);
		}
		
		MethodCommand methodCommand = metadata.getMethodCommand(command);
		if (methodCommand == null) {
			throw new IllegalOperateException(BdtdError.METHOD_COMMAND_NOT_EXIST);
		}

		ICommand response = command.newCouple();
		BdtdPromise<R> promise = NetworkUtil.defaultBdtdPromise((future) -> {
			if (future.isSuccess()) {
				R data = future.get();
				response.setData(data);
			} else {
				BdtdError error = future.getError();
				response.setError(error);
			}
			ctx.write(response);
		});
		try {
			methodCommand.getMethod().invoke(command, promise, command.getData());
		} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
			log.error(String.format("deal request fail, command = [%s], module = [%s]", command, module), e);
			response.setError(BdtdError.UNKNOWN_ERROR);
			ctx.write(response);
		}
	}

	/**
	 * 客户端处理收到的响应
	 */
	@Override
	public <R> void dealResponse(ICommand<R> command) {
		AsyncCallback<R> callback = getAsyncCallback(command);
		if (callback != null) {
			callback.complete(command.getData(), null);
		}
	}
	
	/**
	 * 客户端处理服务器端发送的publish
	 * @param command
	 * @param module
	 */
	private <T> void dealPublish(ICommand<T> command, BdtdModule module) {
		// TODO
	}

}
