import React from "react";

function PostOfficeCard({ postOffice }) {
  return (
    <div className="post-office-card">
      <p>Name: {postOffice.Name}</p>
      <p>Branch Type: {postOffice.BranchType}</p>
      <p>Delivery Status: {postOffice.DeliveryStatus}</p>
      <p>District: {postOffice.District}</p>
      <p>Division: {postOffice.Division}</p>
    </div>
  );
}

export default PostOfficeCard;
