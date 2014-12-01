/**
 * 
 */
package com.talian.app.world;

import java.rmi.RemoteException;

import psdi.bo.MboSetRemote;
import psdi.util.CocoException;

/**
 * @author THINKPAD
 *
 */
public interface VehiclecostSetRemote extends MboSetRemote {
	public void calculateVehicleCostTable () throws CocoException, RemoteException ;
}
