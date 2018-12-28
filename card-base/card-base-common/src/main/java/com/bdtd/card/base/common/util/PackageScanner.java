package com.bdtd.card.base.common.util;

import java.io.IOException;
import java.util.List;

public interface PackageScanner {

    public List<String> getFullyQualifiedClassNameList() throws IOException;
    
    public List<String> getFullyQualifiedClassNameList(EnumClassType classType) throws IOException;
}