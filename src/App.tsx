import { useState, useEffect } from "react";

interface Officer {
  id: number;
  name: string;
  rank: string;
  serviceNumber: string;
  deployment: string;
  phone: string;
  submitted: boolean;
  receivedByAdmin: boolean;
  lastPromotionDate: string;
}

const initialOfficers: Officer[] = [
  { id: 1, name: "Mr Mohammad M Rani", rank: "ACDIO", serviceNumber: "DIA/SO6/147", deployment: "ONSA", phone: "+2348068076158", submitted: false, receivedByAdmin: false, lastPromotionDate: "2017-10-01" },
  { id: 2, name: "Miss KI Nwosu", rank: "ACDIO", serviceNumber: "DIA/SO4/114", deployment: "ONSA", phone: "+2348012345672", submitted: false, receivedByAdmin: false, lastPromotionDate: "2016-09-03" },
  { id: 3, name: "Mr James Abbah Agada", rank: "ACDIO", serviceNumber: "DIA/SO7/163", deployment: "AD WKS", phone: "+2348012345673", submitted: false, receivedByAdmin: false, lastPromotionDate: "2016-09-03" },
  { id: 4, name: "Mrs FT Ibrahim", rank: "CDIO", serviceNumber: "DIA/SO8/385", deployment: "SO PURCHASE", phone: "+2348034226146", submitted: false, receivedByAdmin: false, lastPromotionDate: "2023-12-03" },
  { id: 5, name: "Miss LE Akpan", rank: "ACDIO", serviceNumber: "DIA/S12/598", deployment: "ONSA", phone: "+2348030506764", submitted: false, receivedByAdmin: false, lastPromotionDate: "2019-09-01" },
  { id: 6, name: "Mr Y Aliyu", rank: "ACDIO", serviceNumber: "DIA/S12/607", deployment: "Taraba Cell", phone: "+2348012345676", submitted: false, receivedByAdmin: false, lastPromotionDate: "2022-05-18" },
  { id: 7, name: "EM Akpan", rank: "ACDIO", serviceNumber: "DIA/S12/580", deployment: "Calabar Cell", phone: "+2347030348242", submitted: false, receivedByAdmin: false, lastPromotionDate: "2018-11-01" },
  { id: 8, name: "Ijegbunem Ibeabuchi", rank: "PDIO", serviceNumber: "DIA/S17/798", deployment: "SO 2 WKS", phone: "+2348065378409", submitted: false, receivedByAdmin: false, lastPromotionDate: "2019-11-20" },
  { id: 9, name: "Williams Salmamza", rank: "PDIO", serviceNumber: "DIA/S17/867", deployment: "Damaturu Cell", phone: "+2348098073047", submitted: false, receivedByAdmin: false, lastPromotionDate: "2022-08-12" },
  { id: 10, name: "Jibril Saleh Danpullo", rank: "SDIO", serviceNumber: "DIA/S17/846", deployment: "ONSA", phone: "+2347030318536", submitted: false, receivedByAdmin: false, lastPromotionDate: "2020-02-27" },
  { id: 11, name: "AA Adelegan", rank: "DIO III", serviceNumber: "DIA/J95/209", deployment: "Osogbo Cell", phone: "+2348033155422", submitted: false, receivedByAdmin: false, lastPromotionDate: "2006-01-06" },
  { id: 12, name: "Andrew Agene", rank: "DIO III", serviceNumber: "DIA/J01/283", deployment: "Benue Cell", phone: "+2347038378998", submitted: false, receivedByAdmin: false, lastPromotionDate: "2014-04-01" },
  { id: 13, name: "Peter Ochube", rank: "DIO III", serviceNumber: "DIA/J15/560", deployment: "PH Cell", phone: "+2348067922224", submitted: false, receivedByAdmin: false, lastPromotionDate: "2018-09-18" },
  { id: 14, name: "Mr D Abor", rank: "DIO III", serviceNumber: "DIA/J05/303", deployment: "Operations", phone: "+2348133370326", submitted: false, receivedByAdmin: false, lastPromotionDate: "2005-05-20" },
  { id: 15, name: "DM Osoga", rank: "DIO III", serviceNumber: "DIA/J01/247", deployment: "Course", phone: "+2348036660082", submitted: false, receivedByAdmin: false, lastPromotionDate: "2011-06-01" },
  { id: 16, name: "Sulaiman Abdullahi", rank: "SODI", serviceNumber: "DIA/J09/455", deployment: "AM Halidu-Giwa", phone: "+2348012345698", submitted: false, receivedByAdmin: false, lastPromotionDate: "2022-05-18" },
  { id: 17, name: "Reginald Abaraonye", rank: "CODI", serviceNumber: "DIA/J17/531", deployment: "Ibadan Cell", phone: "+2348065351717", submitted: false, receivedByAdmin: false, lastPromotionDate: "2015-09-01" },
  { id: 18, name: "Abdulrahman A Alabi", rank: "CODI", serviceNumber: "DIA/J13/642", deployment: "Benin Cell", phone: "+2348037371990", submitted: false, receivedByAdmin: false, lastPromotionDate: "2016-04-16" },
  { id: 19, name: "Eni Anwuri Edwin", rank: "ADIO", serviceNumber: "DIA/J17/920", deployment: "Abakaliki Cell", phone: "+2349030392783", submitted: false, receivedByAdmin: false, lastPromotionDate: "2017-05-17" },
  { id: 20, name: "Yakubu Sani", rank: "SODI", serviceNumber: "DIA/J18/1013", deployment: "DTS", phone: "+2348058496199", submitted: false, receivedByAdmin: false, lastPromotionDate: "2021-07-21" },
];

// Utility to format dates
const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString();

const ProgressBar = ({ daysLeft, totalDays }: { daysLeft: number; totalDays: number }) => {
  const percentage = Math.round(((totalDays - daysLeft) / totalDays) * 100);
  let color = "bg-green-500";
  if (daysLeft <= 30) color = "bg-yellow-500";
  if (daysLeft <= 10) color = "bg-red-500";

  return (
    <div className="w-full bg-gray-300 rounded-full h-4 relative">
      <div className={`${color} h-4 rounded-full`} style={{ width: `${percentage}%` }}></div>
      <span className="absolute right-2 top-[-1.2rem] text-sm font-semibold">{percentage}%</span>
    </div>
  );
};

const OfficerCard = ({
  officer,
  daysLeft,
  totalDays,
  onSubmit,
  onReceive,
}: {
  officer: Officer;
  daysLeft: number;
  totalDays: number;
  onSubmit: (id: number) => void;
  onReceive: (id: number) => void;
}) => {
  return (
    <div className="bg-white shadow rounded p-4 border border-gray-200">
      <h2 className="text-xl font-semibold mb-1">{officer.name} ({officer.rank})</h2>
      <p><strong>Service Number:</strong> {officer.serviceNumber}</p>
      <p><strong>Deployment:</strong> {officer.deployment}</p>
      <p><strong>Phone:</strong> {officer.phone}</p>
      <p><strong>Last Promotion:</strong> {formatDate(officer.lastPromotionDate)}</p>
      <p><strong>Days Left:</strong> {daysLeft} days</p>
      <div className="my-2"><ProgressBar daysLeft={daysLeft} totalDays={totalDays} /></div>
      <div className="flex space-x-2 mt-3">
        {!officer.submitted && (
          <button
            onClick={() => onSubmit(officer.id)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          >
            Mark as Submitted
          </button>
        )}
        {officer.submitted && !officer.receivedByAdmin && (
          <button
            onClick={() => onReceive(officer.id)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
          >
            Mark as Received
          </button>
        )}
        {officer.submitted && officer.receivedByAdmin && (
          <span className="text-green-800 font-semibold">APER FORM SUBMITTED</span>
        )}
      </div>
    </div>
  );
};

const ranks = ["All", "ADIO", "ACDIO", "CDIO", "PDIO", "SDIO", "DIO I","DIO II", "DIO III", "CODI", "SODI"];
const submissionStatusOptions = ["All", "Not Submitted", "Submitted", "Received"];

const App = () => {
  const [officers, setOfficers] = useState<Officer[]>(initialOfficers);
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [adminLoggedIn, setAdminLoggedIn] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRank, setFilterRank] = useState("All");
  const [filterSubmission, setFilterSubmission] = useState("All");
  const [sortBy, setSortBy] = useState("submissionStatus"); // or "promotionDate"
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const totalDays = 121;

  useEffect(() => {
    const today = new Date();
    let deadline = new Date(today.getFullYear(), 2, 31); // March 31

    if (today > deadline) {
      deadline = new Date(today.getFullYear() + 1, 2, 31);
    }

    const remainingDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    setDaysLeft(remainingDays);

    // TODO: Add notification/reminder logic here for upcoming deadlines
  }, []);

  const handleSubmit = (id: number) => {
    setOfficers(prev => prev.map(o => o.id === id ? { ...o, submitted: true } : o));
  };

  const handleReceive = (id: number) => {
    setOfficers(prev => prev.map(o => o.id === id ? { ...o, receivedByAdmin: true } : o));
  };

  const handleExport = () => {
    const csvRows = [
      ["Name","Rank","Service Number","Deployment","Phone","Submitted","Received","Last Promotion"].join(","),
      ...officers.map(o => [
        o.name,
        o.rank,
        o.serviceNumber,
        o.deployment,
        o.phone,
        o.submitted ? "Yes" : "No",
        o.receivedByAdmin ? "Yes" : "No",
        o.lastPromotionDate,
      ].join(","))
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "officer_report.csv";
    link.click();
  };

  // Login Validation (simple example)
  const handleLogin = () => {
    if (loginUsername === "admin" && loginPassword === "password123") {
      setAdminLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  // Filter and sort logic
  const filteredOfficers = officers.filter(o => {
    const matchesSearch = o.name.toLowerCase().includes(searchTerm.toLowerCase()) || o.deployment.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRank = filterRank === "All" || o.rank === filterRank;

    let matchesSubmission = true;
    if (filterSubmission === "Not Submitted") matchesSubmission = !o.submitted;
    else if (filterSubmission === "Submitted") matchesSubmission = o.submitted && !o.receivedByAdmin;
    else if (filterSubmission === "Received") matchesSubmission = o.submitted && o.receivedByAdmin;

    return matchesSearch && matchesRank && matchesSubmission;
  });


  const sortedOfficers = [...filteredOfficers].sort((a, b) => {
    if (sortBy === "submissionStatus") {
      // Order: Received > Submitted > Not submitted
      const statusValue = (officer: Officer) =>
        officer.submitted ? (officer.receivedByAdmin ? 2 : 1) : 0;
      return statusValue(b) - statusValue(a);
    } else if (sortBy === "promotionDate") {
      return new Date(b.lastPromotionDate).getTime() - new Date(a.lastPromotionDate).getTime();
    }
    return 0;
  });

  if (!adminLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">DOL Admin Login</h2>
          {loginError && <p className="text-red-600 mb-4">{loginError}</p>}
          <input
            type="text"
            placeholder="Username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="w-full mb-6 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <img className=" rounded-full w-[10%]" src="https://media.licdn.com/dms/image/v2/D4E22AQFSSnN-YOoCHA/feedshare-shrink_800/feedshare-shrink_800/0/1710951284639?e=2147483647&v=beta&t=G9ExVYnV-bThZsdIF_8Rg_-Wi7nScbiuLYM8sfgeM7w" alt="driver"/>
        <h1 className="text-3xl font-extrabold text-gray-800">
          DOL PERSONNEL 2025 APER FORM TRACKER
        </h1>
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          title="Export all officers data as CSV"
        >
          Export to CSV
        </button>
      </header>

      <section className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or deployment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
          aria-label="Search officers by name or deployment"
        />

        <select
          value={filterRank}
          onChange={(e) => setFilterRank(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Filter officers by rank"
        >
          {ranks.map(rank => (
            <option key={rank} value={rank}>{rank}</option>
          ))}
        </select>

        <select
          value={filterSubmission}
          onChange={(e) => setFilterSubmission(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Filter officers by submission status"
        >
          {submissionStatusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Sort officers by"
        >
          <option value="submissionStatus">Sort by Submission Status</option>
          <option value="promotionDate">Sort by Last Promotion Date</option>
        </select>
      </section>

      <section className=" flex flex-col gap-y-4">
        {sortedOfficers.length > 0 ? (
          sortedOfficers.map(officer => (
            <OfficerCard
              key={officer.id}
              officer={officer}
              daysLeft={daysLeft}
              totalDays={totalDays}
              onSubmit={handleSubmit}
              onReceive={handleReceive}
             
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">No officers found matching the criteria.</p>
        )}
      </section>

      <footer className="mt-12 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Directorate of Legal Affairs
      </footer>
    </div>
  );
};

export default App;