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
package com.talian.app.actype;

import java.rmi.RemoteException;

import psdi.bo.Mbo;
import psdi.bo.MboServerInterface;
import psdi.bo.MboSet;
import psdi.util.CocoException;

import com.talian.web20.direct.annotation.SerializedBO;

/**
 * @author Seno
 *
 */
@SerializedBO
public class ActypeSet extends MboSet implements ActypeSetRemote {

	/**
	 * @param ms
	 * @throws RemoteException
	 */
	public ActypeSet(MboServerInterface ms) throws RemoteException {
		super(ms) ;
		// TODO Auto-generated constructor stub
	}

	/* (non-Javadoc)
	 * @see psdi.bo.MboSet#getMboInstance(psdi.bo.MboSet)
	 */
	@Override
	protected Mbo getMboInstance(MboSet ms) throws CocoException,
			RemoteException {
		return new Actype(ms) ;
	}

}
