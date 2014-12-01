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
package com.talian.app.scenass;

import java.rmi.RemoteException;

import psdi.bo.Mbo;
import psdi.bo.MboServerInterface;
import psdi.bo.MboSet;
import psdi.util.CocoException;

/**
 * @author Elga
 *
 */
public class ScenassSet extends MboSet implements ScenassSetRemote {

	/**
	 * @param ms
	 * @throws RemoteException
	 */
	public ScenassSet(MboServerInterface ms) throws RemoteException {
		super(ms);
		// TODO Auto-generated constructor stub
	}

	/* (non-Javadoc)
	 * @see psdi.bo.MboSet#getMboInstance(psdi.bo.MboSet)
	 */
	@Override
	protected Mbo getMboInstance(MboSet ms) throws CocoException,
			RemoteException {
		// TODO Auto-generated method stub
		return new Scenass(ms);
	}

}
