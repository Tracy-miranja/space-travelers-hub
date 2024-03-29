import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './profile.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const { mission } = useSelector((state) => state.mission);
  const { rockets } = useSelector((state) => state.rockets);
  const joinedMissions = mission.filter((m) => m.reserved);
  const reservedRockets = rockets.filter((m) => m.reserved);

  useEffect(() => {
    localStorage.setItem('joinedMissions', JSON.stringify(joinedMissions));
    localStorage.setItem('reservedRockets', JSON.stringify(reservedRockets));
  }, [joinedMissions, reservedRockets]);

  useEffect(() => {
    const joinedMissions = JSON.parse(localStorage.getItem('joinedMissions'));
    const reservedRockets = JSON.parse(localStorage.getItem('reservedRockets'));

    if (joinedMissions) {
      dispatch({ type: 'LOAD_JOINED_MISSIONS', payload: joinedMissions });
    }

    if (reservedRockets) {
      dispatch({ type: 'LOAD_RESERVED_ROCKETS', payload: reservedRockets });
    }
  }, [dispatch]);

  return (
    <>
      <hr />
      <div className="profile-container d-flex ps-5 pe-5">
        <div className="mission-list pe-3">
          <h2>My Missions</h2>
          <table className="profile-table">
            <thead>
              <tr />
            </thead>
            <tbody>
              {joinedMissions.map((m) => (
                <tr key={m.mission_id}>
                  <td className="profile-row pt-3 pb-3 ps-3">{m.mission_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rocket-list ps-3">
          <h2>My Rockets</h2>
          <table className="profile-table">
            <thead>
              <tr />
            </thead>
            <tbody>
              {reservedRockets.map((m) => (
                <tr key={m.id}>
                  <td className="profile-row pt-3 pb-3 ps-3">{m.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Profile;
