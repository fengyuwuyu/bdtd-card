package com.bdtd.card.web.admin.aop;

import static com.bdtd.card.common.web.util.HttpKit.getIp;
import static com.bdtd.card.common.web.util.HttpKit.getRequest;

import java.lang.reflect.UndeclaredThrowableException;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.CredentialsException;
import org.apache.shiro.authc.DisabledAccountException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.bdtd.card.common.web.base.Tip;
import com.bdtd.card.web.admin.config.shiro.ShiroKit;
import com.bdtd.card.web.admin.exception.InternalException;
import com.bdtd.card.web.admin.exception.InvalidKaptchaException;
import com.bdtd.card.web.admin.log.LogManager;
import com.bdtd.card.web.admin.log.LogTaskFactory;
import com.bdtd.card.web.admin.model.BizExceptionEnum;

/**
 * 全局的的异常拦截器（拦截所有的控制器）（带有@RequestMapping注解的方法上都会拦截）
 *
 * @author 
 * @date 2016年11月12日 下午3:19:56
 */
@ControllerAdvice
@Order(Integer.MAX_VALUE)
public class GlobalExceptionHandler {

    private Logger log = LoggerFactory.getLogger(this.getClass());
    
    /**
     * 拦截业务异常
     */
    @ExceptionHandler(InternalException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public Tip notFount(InternalException e) {
        LogManager.me().executeLog(LogTaskFactory.exceptionLog(ShiroKit.getUser().getId(), e));
        getRequest().setAttribute("tip", e.getMessage());
        log.error("业务异常:", e);
        return new Tip(e.getCode(), e.getMessage());
    }

    /**
     * 用户未登录异常
     */
    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public String unAuth(AuthenticationException e) {
        log.error("用户未登陆：", e);
        return "/login.html";
    }

    /**
     * 账号被冻结异常
     */
    @ExceptionHandler(DisabledAccountException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public String accountLocked(DisabledAccountException e, Model model) {
        String username = getRequest().getParameter("username");
        LogManager.me().executeLog(LogTaskFactory.loginLog(username, "账号被冻结", getIp()));
        model.addAttribute("tips", "账号被冻结");
        return "/login.html";
    }

    /**
     * 账号密码错误异常
     */
    @ExceptionHandler(CredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public String credentials(CredentialsException e, Model model) {
        String username = getRequest().getParameter("username");
        LogManager.me().executeLog(LogTaskFactory.loginLog(username, "账号密码错误", getIp()));
        model.addAttribute("tips", "账号密码错误");
        return "/login.html";
    }

    /**
     * 验证码错误异常
     */
    @ExceptionHandler(InvalidKaptchaException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String credentials(InvalidKaptchaException e, Model model) {
        String username = getRequest().getParameter("username");
        LogManager.me().executeLog(LogTaskFactory.loginLog(username, "验证码错误", getIp()));
        model.addAttribute("tips", "验证码错误");
        return "/login.html";
    }

    /**
     * 无权访问该资源异常
     */
    @ExceptionHandler(UndeclaredThrowableException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public Tip credentials(UndeclaredThrowableException e) {
        getRequest().setAttribute("tip", "权限异常");
        log.error("权限异常!", e);
        return new Tip(BizExceptionEnum.NO_PERMITION.getCode(), BizExceptionEnum.NO_PERMITION.getMessage());
    }

    /**
     * 拦截未知的运行时异常
     */
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public Tip notFount(RuntimeException e) {
        if (ShiroKit.getUser() != null) {
            LogManager.me().executeLog(LogTaskFactory.exceptionLog(ShiroKit.getUser().getId(), e));
        }
        getRequest().setAttribute("tip", "服务器未知运行时异常");
        log.error("运行时异常:", e);
        return new Tip(BizExceptionEnum.SERVER_ERROR.getCode(), BizExceptionEnum.SERVER_ERROR.getMessage());
    }
}
