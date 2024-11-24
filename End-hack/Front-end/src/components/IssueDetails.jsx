import { useParams, useNavigate } from "react-router-dom";

const IssueDetails = ({ issues }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const issue = issues.find(i => i.id === parseInt(id));

  if (!issue) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-bold">Issue not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={issue.imageUrl}
        alt={issue.description}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{issue.title}</h1>
        <p className="text-gray-700 mb-4">{issue.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <p>Location: {issue.location.join(', ')}</p>
          <p>Status: <span className="font-semibold">{issue.status}</span></p>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
