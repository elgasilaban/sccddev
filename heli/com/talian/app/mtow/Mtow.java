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
package com.talian.app.mtow;

import java.rmi.RemoteException;

import psdi.bo.Mbo;
import psdi.bo.MboRemote;
import psdi.bo.MboSet;
import psdi.util.CocoException;

import com.talian.app.actype.ActypeRemote;

/**
 * @author Elga
 *
 */
public class Mtow extends Mbo implements MtowRemote {

	public Mtow(MboSet ms) throws RemoteException {
		super(ms);
	}

	@Override
	public void add() throws CocoException, RemoteException {
		super.add();

		MboRemote owner = this.getOwner();

		if (owner instanceof ActypeRemote) {
			setValue("actype", owner.getString("actype"), NOACCESSCHECK|NOVALIDATION_AND_NOACTION);
		}
	}

}
