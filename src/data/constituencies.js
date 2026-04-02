import data from './constituencies.json';

export const constituencies = data;

export const DISTRICTS = [
  "Kasaragod","Kannur","Wayanad","Kozhikode","Malappuram",
  "Palakkad","Thrissur","Ernakulam","Idukki","Kottayam",
  "Alappuzha","Pathanamthitta","Kollam","Thiruvananthapuram",
];

export const districtSeatCounts = DISTRICTS.map((d) => ({
  district: d,
  count: data.filter((c) => c.district === d).length,
}));
