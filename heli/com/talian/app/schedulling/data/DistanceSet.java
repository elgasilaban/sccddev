/*
 *
 * 
 *
 * (C) COPYRIGHT Talian Limited, 2011
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets.
 *
 */
package com.talian.app.schedulling.data;

import java.rmi.RemoteException ;
import java.util.Date ;
import java.util.Hashtable ;

import psdi.bo.MboRemote ;
import psdi.bo.MboSetRemote ;
import psdi.server.CocoServer ;
import psdi.util.CocoException ;

/**
 * @author Seno
 *
 */
public class DistanceSet {
	static Hashtable<String, Distance> list = new Hashtable<String, Distance> ();
	public static void load (MboSetRemote set) throws RemoteException, CocoException {
		MboRemote mbo = set.moveFirst() ;
		while (mbo != null) {
			Distance obj = Distance.getInstance(mbo) ;
			list.put (obj.getKey(), obj) ;
			mbo = set.moveNext() ;
		}		
	}
	
	public static void load () throws RemoteException, CocoException {
		if (list.isEmpty()) {
			CocoServer server = CocoServer.getCocoServer() ;
			MboSetRemote set = server.getMboSet("DISTANCE", server.getSystemUserInfo()) ;
			load (set) ;
		}
	}

	
	public static Distance getDistance(String org, String dest ) {
		return list.get(org+"-"+dest) ;
	}
}
