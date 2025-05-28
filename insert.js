import mongoose from "mongoose";
// Define schemas
const AidedDeptSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GovtDeptSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PublicUndertakingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define models
const AidedDeptModel =
  mongoose.models.AidedDept || mongoose.model("AidedDept", AidedDeptSchema);
const GovtDeptModel =
  mongoose.models.GovtDept || mongoose.model("GovtDept", GovtDeptSchema);
const PublicUndertakingModel =
  mongoose.models.PublicUndertaking ||
  mongoose.model("PublicUndertaking", PublicUndertakingSchema);

// Data to insert
const govtDeptData = [
  { name: "Secretary Vidhan Sabha", language: "English" },
  { name: "Secretary Sri Governor", language: "English" },
  { name: "Registrar, Hon'ble High Court", language: "English" },
  { name: "Secretary, Law (Grants)", language: "English" },
  {
    name: "Member Secretary State Legal Service Authority",
    language: "English",
  },
  { name: "Chief Electoral Officer", language: "English" },
  { name: "Commissioner State Election Commission", language: "English" },
  { name: "DG, Home Guards", language: "English" },
  { name: "Director Vigilence", language: "English" },
  { name: "Right to Service Commission", language: "English" },
  { name: "Secretary Lokayukta", language: "English" },
  { name: "Secretary State Information Commission", language: "English" },
  {
    name: "Director Uttarakhand Administrative Training Academy",
    language: "English",
  },
  { name: "Relief Commissioner", language: "English" },
  { name: "Director, Civil Defence", language: "English" },
  { name: "Chief Revenue Commissioner", language: "English" },
  { name: "Secretary Finance (HOD)", language: "English" },
  { name: "Director Treasury Pension and Entitlement", language: "English" },
  { name: "SAD", language: "English" },
  { name: "Director Audit", language: "English" },
  {
    name: "Additional Secretary Finance Pay Commission Cell",
    language: "English",
  },
  { name: "Director State Planning Commission", language: "English" },
  { name: "Commissioner Tax", language: "English" },
  { name: "Registrar Chits Firms & Societies", language: "English" },
  { name: "Secretary Legislative Affairs", language: "English" },
  { name: "R S A", language: "English" },
  { name: "Director Electrical Safety", language: "English" },
  { name: "Director National Savings", language: "English" },
  { name: "Chairman Commercial Tax Tribunal", language: "English" },
  { name: "Directorate Departmental Accounts UK", language: "English" },
  { name: "Director Economic & Statistics", language: "English" },
  { name: "Excise Commissioner", language: "English" },
  { name: "Secretary UK S.S.S.C. Dehradun", language: "English" },
  { name: "Secretary Public Service Commission", language: "English" },
  { name: "Inspector General Prisons", language: "English" },
  { name: "Director General Prosecution", language: "English" },
  { name: "Director General Police", language: "English" },
  { name: "Secretary Human Rights", language: "English" },
  { name: "Director Sports", language: "English" },
  { name: "Director Culture", language: "English" },
  { name: "Director Sanskrit Education", language: "English" },
  { name: "Director Secondary Education", language: "English" },
  { name: "DIRECTOR ACADEMIC RESEARCH & TRAINING UK", language: "English" },
  { name: "Director Technical Education", language: "English" },
  { name: "Director National Cadet Corps", language: "English" },
  { name: "Secretary Technical Education Board", language: "English" },
  { name: "Director Higher Education", language: "English" },
  { name: "Director Bhasha", language: "English" },
  {
    name: "Commandent General Youth Welfare and PVD Officer",
    language: "English",
  },
  { name: "Director Elementary Education", language: "English" },
  {
    name: "Food Safety and Drug Administration Uttarakhand",
    language: "English",
  },
  {
    name: "Director General Medical Health & Family Welfare",
    language: "English",
  },
  { name: "Director Ayurved", language: "English" },
  { name: "Director Medical Education", language: "English" },
  { name: "Director Homeopathy", language: "English" },
  { name: "Secretary Rajya Safai Karamchari Ayog", language: "English" },
  { name: "Director Local Bodies", language: "English" },
  { name: "Secretary, Housing", language: "English" },
  { name: "Director Information", language: "English" },
  { name: "Director Social Welfare", language: "English" },
  { name: "Director I C D S", language: "English" },
  { name: "Director Minority Welfare", language: "English" },
  { name: "Directorate of Women Welfare, Uttarakhand", language: "English" },
  { name: "Director Soldier Welfare & Rahabilitaion", language: "English" },
  { name: "Director Employment & Training", language: "English" },
  { name: "Director ESI", language: "English" },
  { name: "Director Training", language: "English" },
  { name: "Labour Commissioner", language: "English" },
  { name: "Director Watershed Management", language: "English" },
  { name: "Cane Commissioner", language: "English" },
  { name: "Director Agriculture", language: "English" },
  { name: "Registrar Co-operative Societies", language: "English" },
  { name: "Rural Development Commissioner", language: "English" },
  { name: "Chief Engineer RES", language: "English" },
  { name: "Director Panchayat Raj", language: "English" },
  { name: "Chief Engineer Irrigation", language: "English" },
  { name: "Chief Engineer Minor Irrigation", language: "English" },
  { name: "Secretary Power Grants", language: "English" },
  { name: "Chief Engineer PWD", language: "English" },
  { name: "Director Geology and Mining Uttarakhand", language: "English" },
  { name: "Director Industries", language: "English" },
  { name: "Director Civil Aviation", language: "English" },
  { name: "Transport Commissioner", language: "English" },
  { name: "Chairman State Transport Authority", language: "English" },
  { name: "Commissioner Food", language: "English" },
  { name: "Controller Legal Metrology", language: "English" },
  {
    name: "President State Consumer Dispute Redressal Commission",
    language: "English",
  },
  { name: "Director Tourism", language: "English" },
  { name: "Principal Chief Conservator of Forest", language: "English" },
  {
    name: "Director, State Environment Conservation & Climate Change Directorate, Uttarakhand",
    language: "English",
  },
  { name: "Director Dairy Developmment", language: "English" },
  { name: "Director Animal Husbandry", language: "English" },
  { name: "Director Fisheries", language: "English" },
  { name: "Chief Executive Officer, Bhesaj Development", language: "English" },
  { name: "Director Horticulture", language: "English" },
  { name: "Director Sericulture", language: "English" },
  { name: "Secretary, Social Welfare (Grants)", language: "English" },
  { name: "Director Tribal Welfare", language: "English" },
];

const aidedDeptData = [
  {
    name: "Uttrakhand State Disaster Management Authority / Uttarakhand Landslide Mitigation and Management Center",
    language: "English",
  },
  {
    name: "Pandit Deendayal Upadhyay Centre for training and research in financial administration, Uttarakhand",
    language: "English",
  },
  { name: "National Service Scheme", language: "English" },
  { name: "Grant-in-Aid to Private Colleges", language: "English" },
  { name: "Sports College Pithoragarh", language: "English" },
  {
    name: "Pt Nansingh Surveyor Mountaineering Training Institute Munsiyari Pithoragarh",
    language: "English",
  },
  { name: "Shri Dev Suman Uttarakhand University", language: "English" },
  { name: "Assistance Aided Secondary School", language: "English" },
  { name: "Uttarakhand Urdu Academy", language: "English" },
  { name: "Aided Sanskrit Schools", language: "English" },
  { name: "Uttarakhand Technical University", language: "English" },
  { name: "GB Pant Engineering College, Pauri Garhwal", language: "English" },
  { name: "K.L. Polytechnic, Roorkee", language: "English" },
  { name: "Pant College of Technology, Pantnagar", language: "English" },
  { name: "Maharana Pratap Sports College, Dehradun", language: "English" },
  { name: "Kumaun University, Nainital", language: "English" },
  { name: "Uttarakhand Sanskrit University", language: "English" },
  { name: "State Youth Welfare Council", language: "English" },
  { name: "Kumaon Engineering College, Dwarahat", language: "English" },
  {
    name: "Assistance to Aided Junior High School/K.G and Nursery School",
    language: "English",
  },
  { name: "Uttarakhand Sanskrit Academy", language: "English" },
  { name: "Uttarakhand Open University", language: "English" },
  { name: "Uttarakhand Hindi Academy", language: "English" },
  { name: "Uttarakhand Language Institute", language: "English" },
  { name: "Nehru Mountaineering Institute, Uttarkashi", language: "English" },
  { name: "Soban Singh Jeena University, Almora", language: "English" },
  { name: "Doon University", language: "English" },
  { name: "Establishment of Medical Council of India", language: "English" },
  { name: "Uttarakhand Ayurveda University, Dehradun", language: "English" },
  {
    name: "Registrar Homoeopathic Medicine Board, Uttarakhand",
    language: "English",
  },
  {
    name: "Bhagirathi River Valley Development Authority",
    language: "English",
  },
  { name: "Uttrakhand Real Estate Regulatory Authority", language: "English" },
  {
    name: "Uttrakhand Housing and Urban development Authority",
    language: "English",
  },
  { name: "Project Management Unit, Swajal Project", language: "English" },
  {
    name: "Uttarakhand State Haj Committee, Haj House, Piran Kaliyar Roorkee",
    language: "English",
  },
  {
    name: "Uttarakhand Ex-Servicemen Welfare Corporation Ltd. (Upanal)",
    language: "English",
  },
  {
    name: "Uttaranchal Seeds and Terai Development Corporation Limited",
    language: "English",
  },
  {
    name: "Uttaranchal State Seed and Organic Production Certification Agency",
    language: "English",
  },
  {
    name: "VCSG, University of Uttarakhand Horticulture and Forestry, Bharsar",
    language: "English",
  },
  {
    name: "Gobind University of Agriculture and Technology, Pantnagar",
    language: "English",
  },
  {
    name: "Uttarakhand Agricultural Produce Market Council",
    language: "English",
  },
  { name: "Biotechnology Karyakram", language: "English" },
  { name: "State Organic Products Council", language: "English" },
  { name: "District Panchayat", language: "English" },
  {
    name: "Uttarakhand Renewable Energy Development Agency (UREDA)",
    language: "English",
  },
  { name: "ITDA", language: "English" },
  {
    name: "Uttarakhand State Council for Science and Technology",
    language: "English",
  },
  {
    name: "Uttarakhand Science Education and Research Center (USERC)",
    language: "English",
  },
  {
    name: "Uttarakhand Khadi and Village Industries Board",
    language: "English",
  },
  { name: "Space Applications Center", language: "English" },
  { name: "Kedarnath Development Authority", language: "English" },
  { name: "Shri Kedarnath Utthan Charitable Trust", language: "English" },
  { name: "Uttarakhand Tourism Development Council", language: "English" },
  {
    name: "State Institute of Hotel Management and Catering Technology New Tehri",
    language: "English",
  },
  {
    name: "Tehri Special Area Tourism Development Authority",
    language: "English",
  },
  { name: "Uttarakhand Pollution Control Board", language: "English" },
  { name: "Uttarakhand Tea Development Board", language: "English" },
  { name: "Centre for Aromatic Plants (CAP)", language: "English" },
  { name: "State Medicinal Plants Board", language: "English" },
  {
    name: "Herbal Research and Development Institute (HRDI)",
    language: "English",
  },
  { name: "Uttarakhand Horticulture Board", language: "English" },
];

const publicUndertakingData = [
  {
    name: "Uttarakhand Drinking Water Resources Development and Construction Corporation",
    language: "English",
  },
  { name: "Uttarakhand Jal Sansthan", language: "English" },
  {
    name: "Uttarakhand Metro Rail, Urban Infrastructure and Building Construction Corporation Ltd",
    language: "English",
  },
  {
    name: "Uttarakhand Minorities Welfare and Wakf Development Corporation",
    language: "English",
  },
  {
    name: "Uttaranchal Multipurpose Finance and Development Corporation Ltd.",
    language: "English",
  },
  { name: "Doiwala Sugar Company Ltd", language: "English" },
  { name: "Kichcha Sugar Company Ltd", language: "English" },
  {
    name: "Uttarakhand Agricultural Produce Market Committees",
    language: "English",
  },
  { name: "Uttarakhand Jal Vidyut Nigam Limited", language: "English" },
  { name: "Uttarakhand Power Corporation Ltd", language: "English" },
  {
    name: "Power Transmission Corporation, Uttarakhand Limited",
    language: "English",
  },
  {
    name: "Bridge Ropeway Tunnel and Other Infrastructure Development Corporation of Uttarakhand Limited (BRIDCUL)",
    language: "English",
  },
  {
    name: "State Infrastructure and Industrial Development Corporation of Uttarakhand Ltd (SIIDCUL)",
    language: "English",
  },
  { name: "Kumaun Mandal Development Corporation", language: "English" },
  { name: "Garhwal Mandal Development Corporation", language: "English" },
  { name: "Uttarakhand Forest Development Corporation", language: "English" },
];

// Function to insert data
async function insertData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb+srv://harryscode87:test123@cluster0.bixxkao.mongodb.net/JobPortal"
    );
    console.log("Connected to MongoDB");

    // Insert Government Department data
    await GovtDeptModel.insertMany(govtDeptData);
    console.log("Government Department data inserted successfully");

    // Insert Aided Department data
    await AidedDeptModel.insertMany(aidedDeptData);
    console.log("Aided Department data inserted successfully");

    // Insert Public Undertaking data
    await PublicUndertakingModel.insertMany(publicUndertakingData);
    console.log("Public Undertaking data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

// Run the insertion
insertData();
