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
package com.talian.app.reservation;

import java.rmi.RemoteException ;
import java.util.ArrayList ;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Random;

import org.apache.log4j.PropertyConfigurator;

import com.talian.app.modatrip.ModatripSet;
import com.talian.app.modatrip.ModatripSetRemote;
import com.talian.web20.direct.annotation.SerializedBO ;

import psdi.bo.Mbo ;
import psdi.bo.MboRemote ;
import psdi.bo.MboServerInterface ;
import psdi.bo.MboSet ;
import psdi.bo.MboSetRemote ;
import psdi.util.CocoException ;

/**
 * @author Seno
 *
 */
@SerializedBO
public class ReservationSet extends MboSet implements ReservationSetRemote {

	/**
	 * @param ms
	 * @throws RemoteException
	 */
	public ReservationSet(MboServerInterface ms) throws RemoteException {
		super(ms);
		// TODO Auto-generated constructor stub
	}

	/* (non-Javadoc)
	 * @see psdi.bo.MboSet#getMboInstance(psdi.bo.MboSet)
	 */
	@Override
	protected Mbo getMboInstance(MboSet ms) throws CocoException,
			RemoteException {
		return new Reservation(ms);
	}
	
	public void rebuildSummaryTable () throws CocoException, RemoteException {
		
		MboServerInterface server = getMboServer() ; 		
		MboSetRemote summaries = server.getMboSet("resvsum", this.getUserInfo());
		summaries.deleteAll();
		
		summaries.save();		
	}

	//multi moda
	public ArrayList<ReservationRemote> breakIntoSubReservations(ArrayList<ReservationRemote> reservations) throws RemoteException, CocoException {
		ArrayList<ReservationRemote> subReservationList = new ArrayList<ReservationRemote> ();
		Iterator<ReservationRemote> it = reservations.iterator();
		while(it.hasNext())
		{
		    ReservationRemote resv = it.next();
		    
		    //check from-to

		    //check related to MODATRIP
		    ModatripSetRemote modatrips = (ModatripSetRemote)resv.getMboSet("modatrip1", "MODATRIP", "ORG='"+resv.getOrg()+"' and DEST='"+resv.getDest()+"'");
		    //loop for subReservationList
		    MboRemote modatrip = modatrips.moveFirst();
		    MboSetRemote preprocesss = resv.getMboSet("PREPROCESS");
		    if(modatrips.count() > 0){
				MboRemote preprocess =  preprocesss.add();
				preprocess.setValue("parentresv", resv.getInt("reservationid"));
				
				while (modatrip != null) {
		    		if (modatrips.getCurrentPosition() < modatrips.count()-1) {
		    			//prevent the value of "FROM"-sub reservation generation same as the "destination"
		    			if (!modatrip.getString("PORT").equals(modatrip.getString("DEST"))) {
			    			ReservationRemote reservation = (ReservationRemote) this.add();
							reservation.setValue("DESCRIPTION", resv.getString("DESCRIPTION"));
							reservation.setValue("DISPLAYNAME", resv.getString("DISPLAYNAME"));
							reservation.setValue("ORG", modatrip.getString("PORT"));
							
							MboRemote modatrip2 = modatrips.moveNext();
							reservation.setValue("DEST", modatrip2.getString("PORT"));
							modatrips.movePrev();
							
							reservation.setValue("POV", resv.getString("POV"));
							reservation.setValue("COMPANY", resv.getString("COMPANY"));
							reservation.setValue("PRIORITY", resv.getString("PRIORITY"));
							reservation.setValue("FLIGHTSESSION", resv.getString("FLIGHTSESSION"));
							reservation.setValue("PAXWEIGHT", resv.getString("PAXWEIGHT"));
							reservation.setValue("LUGGAGEWEIGHT", resv.getString("LUGGAGEWEIGHT"));
							reservation.setValue("RESERVEDATE", resv.getString("RESERVEDATE"));
							reservation.setValue("CHANGEDDATE", resv.getString("CHANGEDDATE"));
							reservation.setValue("RESCHANGEDDATE", resv.getString("RESCHANGEDDATE"));
							reservation.setValue("POSITION", resv.getString("POSITION"));
							reservation.setValue("PROCESS", preprocess.getInt("PREPROCESSID"));
							reservation.setValue("PARENT", resv.getString("RESERVATIONID"));
							reservation.setValue("TRIPGROUP", modatrip.getString("TRIPGROUP"));
							reservation.readfromMbo();
							preprocesss.save();
							subReservationList.add(reservation);
							this.save();
						}
					}
					modatrip = modatrips.moveNext(); 
				}
		    }
			preprocesss.save();
			PropertyConfigurator pc = new PropertyConfigurator();
		}
		return subReservationList;
	}
}
