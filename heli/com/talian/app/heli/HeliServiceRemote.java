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
package com.talian.app.heli;

import java.rmi.RemoteException;
import java.util.Date ;
import java.util.List ;

import com.talian.app.scenario.FlightScenario;

import psdi.bo.MboRemote;
import psdi.bo.MboSetRemote;
import psdi.server.AppServiceRemote;
import psdi.util.CocoException;

/**
 * @author Seno
 *
 */
public interface HeliServiceRemote extends AppServiceRemote {
	public void runScheduller(Date tripDate, String flightsession) throws RemoteException, CocoException ;
	public boolean isRunning (Date tripDate, String flightsession) throws RemoteException, CocoException ;

    public boolean isSchedullerRunning ()  throws RemoteException ;
    public void setSchedullerRunning (boolean isRun)  throws RemoteException ;
    public void stopScheduller ()  throws RemoteException ;
    public boolean isStopping ()  throws RemoteException ;
    public void setScenarioList (List<FlightScenario> fsList)  throws RemoteException ;
    public List<FlightScenario> getScenarioList ()  throws RemoteException ;

    public void putLog (String s) throws RemoteException ;
	public List<String> getServiceLog () throws RemoteException, CocoException  ;
	public boolean runSched() throws RemoteException ;
}
