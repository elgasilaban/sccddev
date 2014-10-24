/*
 *
 * 
 *
 * (C) COPYRIGHT Talian Limited, 2010
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets.
 *
 */
package com.talian.configure;

import java.io.File ;
import java.net.URL ;

/**
 * @author Seno
 *
 */
public class CommonShell {
	
	public String getRootDirName()
    throws Exception
	{
	    String rootDirName = null;
	    URL u = getClass().getResource("/");
	    if(u != null)
	    {
	        String s = u.getFile();
	        s = s.replaceAll("%20", " ");
	        if(s != null && s.length() > 1)
	            rootDirName = s.substring(1);
	    }
	    if(rootDirName == null || rootDirName.length() <= 0)
	    {
	        rootDirName = System.getProperty("user.dir");
	        rootDirName = rootDirName.replaceAll("%20", " ");
	    }
	    String separator = "/";
	    if(rootDirName.indexOf(File.separator) >= 0)
	        separator = File.separator;
	    if(rootDirName.endsWith("classes") || rootDirName.endsWith("classes" + separator))
	    {
	        if(rootDirName.endsWith(separator))
	            rootDirName = rootDirName.substring(0, rootDirName.length() - 1);
	        int pos = rootDirName.lastIndexOf(separator);
	        rootDirName = rootDirName.substring(0, pos);
	    }
	    return rootDirName;
	}
	
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		CommonShell shell = new CommonShell () ;
		try {
			System.out.println(shell.getRootDirName()) ;
		}
		catch (Exception e) {
			e.printStackTrace();
		}

	}

}
