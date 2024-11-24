const IssueCard = ({ issue }) => {
  return (
    <div className="border rounded-lg shadow-md p-4">
      <img
        src={issue.imageUrl}
        alt={issue.description}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-lg font-semibold mt-2">{issue.title}</h2>
      <p className="text-gray-600">{issue.description}</p>
      <p className="text-sm text-blue-500">Location: {issue.location}</p>
      <div className="flex justify-between items-center mt-4">
        <button className="text-green-600">Upvote</button>
        <span>{issue.status}</span>
        <button className="text-red-600">Downvote</button>
      </div>
    </div>
  );
};

export default IssueCard;
