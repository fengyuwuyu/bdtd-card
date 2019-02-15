package com.bdtd.card.web.admin.aop.util;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bdtd.card.common.consts.Consts;
import com.bdtd.card.common.util.ClasspathPackageScanner;
import com.bdtd.card.common.util.EnumClassType;
import com.bdtd.card.common.web.model.EnumAdapterEntity;

public class EnumAdapterFactory {

    private static String[] packages = {"com.bdtd.card.base.model"};
//    private static List<String> classList = Arrays.asList("com.bdtd.card.restaurant.common.model.EnumActivityType", "com.bdtd.card.restaurant.common.model.EnumCardType", "com.bdtd.card.restaurant.common.model.EnumDishesStatus", 
//            "com.bdtd.card.restaurant.common.model.EnumGender", "com.bdtd.card.restaurant.common.model.EnumOnlineOperateMoneyType", "com.bdtd.card.restaurant.common.model.EnumOperateMoneyType", "com.bdtd.card.restaurant.common.model.EnumOrderStatus", 
//            "com.bdtd.card.restaurant.common.model.EnumPaymentType", "com.bdtd.card.restaurant.common.model.EnumRechargeStatus", "com.bdtd.card.restaurant.common.model.EnumResourceCategory", 
//            "com.bdtd.card.restaurant.common.model.EnumResourceStatus", "com.bdtd.card.restaurant.common.model.EnumResourceType", "com.bdtd.card.restaurant.common.model.EnumStarLevel", "com.bdtd.card.restaurant.common.model.EnumTimeInterval", 
//            "com.bdtd.card.restaurant.common.model.EnumTimeIntervalStatus", "com.bdtd.card.restaurant.common.model.EnumWeek", "com.stylefeng.guns.core.model.base.EnumOriginMask", 
//            "com.stylefeng.guns.core.model.EnumGender", "com.bdtd.card.restaurant.common.model.EnumResourceCategoryDesc");
    private static Map<String, Map<Object, Object>> enumCache = new HashMap<>();
    private static Map<String, List<Map<String, Object>>> enumListCache = new HashMap<>();
    private static Logger log = LoggerFactory.getLogger(EnumAdapterFactory.class);
    static {
        try {
//            init(classList);
        	init();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    
    public static void init() throws Exception {
        for (String p : packages) {
            ClasspathPackageScanner scanner = new ClasspathPackageScanner(p);
            List<String> classList = scanner.getFullyQualifiedClassNameList(EnumClassType.ENUM);
            init(classList);
        }
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
    private static void init(List<String> classList) throws ClassNotFoundException, NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        if (classList.size() == 0) {
            return;
        }
        
        for (String className : classList) {
            Class clazz = Class.forName(className);
            String simpleClassName = clazz.getSimpleName();
            Method method = clazz.getDeclaredMethod(Consts.ENUM_SELECT_METHOD_NAME);
            List<Map<String, Object>> itemList = null;
            try {
            	itemList = (List<Map<String, Object>>) method.invoke(null);
            	enumListCache.put(simpleClassName, itemList);
      			} catch (Exception e) {
      				log.error(simpleClassName);
      			}
            
            Map<Object, Object> map = new TreeMap<>(); 
            
            itemList.forEach((item) -> {
                Object type = item.get(Consts.ENUM_SELECT_ID_FIELD_NAME);
                Object desc = item.get(Consts.ENUM_SELECT_NAME_FIELD_NAME);
                map.put(type, desc);
            });
            
            enumCache.put(simpleClassName, map);
        }
    }
    
    public static List<Map<String, Object>> getItemList(String enumName) {
    	return enumListCache.get(enumName);
    }
    
    public static void adapterRows(List<Map<String, Object>> rows, List<EnumAdapterEntity> enumAdapters) {
        if (rows == null || rows.size() == 0) {
            return;
        }
        
        if (enumAdapters == null || enumAdapters.size() == 0) {
            throw new IllegalArgumentException(String.format("illagel enumAdapters [%s]", enumAdapters));
        }
        
        rows.stream().forEach((item) -> {
            enumAdapters.stream().forEach((entity) -> {
                String fieldName = entity.getFieldName();
                Object value = item.get(fieldName);
                if (value == null) {
                    return;
                }
                
                Function<Object, Object> adapterFunc = entity.getAdapterFunc();
                if (adapterFunc == null) {
                    Object adapterValue = getAdapterValue(entity.getEnumName(), value);
                    item.put(fieldName, adapterValue);
                } else {
                    item.put(fieldName, adapterFunc.apply(value));
                }
            });
        });
        
    }
    
    public static Object getAdapterValue(String enumName, Object key) {
        Map<Object, Object> enumMap = enumCache.get(enumName);
        if (enumMap == null) {
            return null;
        }
        return enumMap.get(key);
    }
    
}
