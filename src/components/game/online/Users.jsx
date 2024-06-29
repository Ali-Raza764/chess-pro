import Image from "next/image";
import React from "react";

const Users = ({ players }) => {
  return (
    <div className="w-full flex items-center justify-between p-3">
      {players?.map((player, index) => {
        return (
          <div key={index} className="flex items-center gap-2">
            {/* <Image
              src="https://dummyimage.com/50X50"
              className="rounded-full h-10"
              height={50}
              width={50}
              alt="User Image"
            /> */}
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
