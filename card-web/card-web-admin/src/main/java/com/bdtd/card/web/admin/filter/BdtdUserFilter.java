/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package com.bdtd.card.web.admin.filter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.AccessControlFilter;
import org.apache.shiro.web.util.WebUtils;

import com.bdtd.card.web.admin.config.shiro.ShiroKit;

public class BdtdUserFilter extends AccessControlFilter {

    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
        if (isLoginRequest(request, response)) {
            return true;
        } else {
            Subject subject = getSubject(request, response);
            return subject.getPrincipal() != null;
        }
    }

    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
        HttpServletRequest httpServletRequest = WebUtils.toHttp(request);
        HttpServletResponse httpServletResponse = WebUtils.toHttp(response);

        /**
         * 如果是ajax请求则不进行跳转
         */
        if (httpServletRequest.getHeader("x-requested-with") != null
                && httpServletRequest.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")) {
            httpServletResponse.setHeader("sessionstatus", "timeout");
            return false;
        } else {

            /**
             * 第一次点击页面
             */
            String referer = httpServletRequest.getHeader("Referer");
            if (referer == null) {
                saveRequestAndRedirectToLogin(request, response);
                return false;
            } else {

                /**
                 * 从别的页面跳转过来的
                 */
                if (ShiroKit.getSession().getAttribute("sessionFlag") == null) {
                    httpServletRequest.setAttribute("tips", "session超时");
                    httpServletRequest.getRequestDispatcher("/login.html").forward(request, response);
                    return false;
                } else {
                    saveRequestAndRedirectToLogin(request, response);
                    return false;
                }
            }
        }
    }
}
