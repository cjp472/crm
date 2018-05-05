// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SelectedLanguage.java

package com.htsoft.oa.common;


public class SelectedLanguage
{
 
    public SelectedLanguage()
    {
    }

    public static void setLanType(String langType)
    {
        lanType = "Lan:" + langType;
    }

    public static String getLanType()
    {
        return "Lan:1";//lanType;
    }

    private static String lanType = "Lan:1";

}
