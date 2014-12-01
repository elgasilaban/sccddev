/**
 * 
 */
package com.talian.app.world;

import java.rmi.RemoteException;

import com.talian.app.acreg.AcregSet;
import com.talian.app.acreg.AcregSetRemote;

import psdi.bo.Mbo;
import psdi.bo.MboRemote;
import psdi.bo.MboServerInterface;
import psdi.bo.MboSet;
import psdi.bo.MboSetRemote;
import psdi.util.CocoException;

/**
 * @author THINKPAD
 *
 */
public class VehiclecostSet extends MboSet implements VehiclecostSetRemote {

	public VehiclecostSet(MboServerInterface ms) throws RemoteException {
		super(ms);
		// TODO Auto-generated constructor stub
	}

	/* (non-Javadoc)
	 * @see com.talian.app.world.VehiclecostSetRemote#calculateVehicleCostTable()
	 */
	@Override
	public void calculateVehicleCostTable() throws CocoException, RemoteException {
		this.deleteAll();
		MboServerInterface server = getMboServer();
		
		MboSetRemote distances = server.getMboSet("distance", this.getUserInfo());
		int cnt1 = distances.count();
		
		MboSetRemote acregs = server.getMboSet("acreg", this.getUserInfo());
		int cnt2 = acregs.count();
		
		for (int i = 0; i < cnt1; i++) {
			for (int j = 0; j < cnt2; j++) {
				MboRemote distance = distances.getMbo(i);
				MboRemote acreg = acregs.getMbo(j);
				
				MboRemote vehiclecost = this.add(NOACCESSCHECK|NOVALIDATION_AND_NOACTION);
				vehiclecost.setValue("distanceid", distance.getInt("distanceid"), NOACCESSCHECK|NOVALIDATION_AND_NOACTION);
				vehiclecost.setValue("acreg", acreg.getString("acreg"), NOACCESSCHECK|NOVALIDATION_AND_NOACTION);
				vehiclecost.setValue("cost", (distance.getDouble("nmi")*acreg.getDouble("multiplier")), NOACCESSCHECK|NOVALIDATION_AND_NOACTION);
			}
		}
		save();
	}

	/* (non-Javadoc)
	 * @see psdi.mbo.MboSet#getMboInstance(psdi.mbo.MboSet)
	 */
	@Override
	protected Mbo getMboInstance(MboSet arg0) throws CocoException,
			RemoteException {
		return null;
	}

}
