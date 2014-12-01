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
package com.talian.app.modatrip;

import java.rmi.RemoteException;

import psdi.bo.Mbo;
import psdi.bo.MboSet;

/**
 * @author Elga
 *
 */
public class Modatrip extends Mbo implements ModatripRemote {

	/**
	 * @param ms
	 * @throws RemoteException
	 */
	public Modatrip(MboSet ms) throws RemoteException {
		super(ms);
		// TODO Auto-generated constructor stub
	}

}
