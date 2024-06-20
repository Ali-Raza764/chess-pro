import React from "react";

const Users = ({ players }) => {
  return (
    <div className="w-full flex items-center justify-between p-3">
      {players?.map((player, index) => {
        return (
          <div key={index} className="flex items-center gap-2">
            <img
              src="https://dummyimage.com/50X50"
              className="rounded-full h-10"
            />
            <div>
              <h3 className="font-semibold text-lg">{player.name}</h3>
              <p className="text-sm">{player.side}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
