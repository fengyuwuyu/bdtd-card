package com.bdtd.card.web.admin.aop;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;

import com.bdtd.card.common.web.annotation.DictEntity;
import com.bdtd.card.common.web.annotation.DictHandler;
import com.bdtd.card.data.admin.model.Dict;
import com.bdtd.card.web.admin.cache.DictCacheFactory;
import com.bdtd.card.web.admin.model.enums.DictWrapperEntity;

@Aspect
@Component
@ConditionalOnBean(value=DictCacheFactory.class)
public class DictHandlerAop {
	
//	private Logger log = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private DictCacheFactory dictCacheFactory;
	
	@Pointcut(value = "@annotation(com.bdtd.card.common.web.annotation.DictHandler)")
    public void cutService() {
    }
	
	@Around("cutService()")
	public Object around(ProceedingJoinPoint point) throws Throwable {
		Object result = point.proceed();
		MethodSignature msig = check(point);
		handleDictModels(point, msig);
		handleDictEntitys(point, msig, result);
		return result;
		
	}
	
	private MethodSignature check(ProceedingJoinPoint point) {
		Signature sig = point.getSignature();
        if (!(sig instanceof MethodSignature)) {
            throw new IllegalArgumentException("该注解只能用于方法");
        }
        return (MethodSignature)sig;
	}

	@SuppressWarnings("unchecked")
	private void handleDictEntitys(ProceedingJoinPoint point, MethodSignature msig, Object result) throws NoSuchMethodException, SecurityException {
		Object target = point.getTarget();
		Method currentMethod = target.getClass().getMethod(msig.getName(), msig.getParameterTypes());
		DictHandler dictHandler = currentMethod.getAnnotation(DictHandler.class);
		DictEntity[] dictEntitys = dictHandler.dictWrappers();
		if (dictEntitys == null || dictEntitys.length == 0) {
			return;
		}
		
		List<Map<String, Object>> list = null;
		if (result instanceof List) {
			list = (List<Map<String, Object>>) result;
		} else if (result instanceof HashMap){
			Map<String, Object> pageMap = (Map<String, Object>) result;
			if (!pageMap.containsKey("rows")) {
			    return ;
			}
			list = (List<Map<String, Object>>) (pageMap.get("rows"));
		} else {
		    return;
		}
		List<DictWrapperEntity> dictwrapperEntities = new ArrayList<DictWrapperEntity>();
        for (DictEntity dictEntity : dictEntitys) {
            DictWrapperEntity dictWrapperEntity = new DictWrapperEntity(dictEntity);
            dictwrapperEntities.add(dictWrapperEntity);
        }
        dictCacheFactory.wrapper(list, dictwrapperEntities);
        
        
	}
	
	
	private Model getModel(ProceedingJoinPoint point) {
        Object[] args = point.getArgs();
	    Model model = null;
        for (Object obj : args) {
            if (obj != null && Model.class.isAssignableFrom(obj.getClass())) {
                model = (Model)obj;
                break;
            }
        }
        return model;
	}

	private void handleDictModels(ProceedingJoinPoint point, MethodSignature msig) throws NoSuchMethodException, SecurityException {
		Object target = point.getTarget();
        Method currentMethod = target.getClass().getMethod(msig.getName(), msig.getParameterTypes());
        Model model = getModel(point);
        
        if (model == null) {
        	return;
        }
        
        DictHandler dictHandler = currentMethod.getAnnotation(DictHandler.class);
        int[] dicts = dictHandler.dictModels();
        String[] dictKeys = dictHandler.dictKeys();
        if (dicts != null && dicts.length > 0 && dictKeys.length == dicts.length) {
        	for (int i = 0; i < dicts.length; i++) {
				int parentId = dicts[i];
				List<Dict> dictList = dictCacheFactory.getDictListByParentId(parentId);
			    String key = dictKeys[i];
			    model.addAttribute(key, dictList);
			}
        }
	}
	
}
