import { useState  , useEffect , useRef } from "react";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",

    phone: "",
    email: "",
    equipmentType: "",
    siteLocation: "",
    startDate: "",
    endDate: "",
  });

  const [equipmentList, setEquipmentList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
const submittingRef = useRef(false);

useEffect(() => {
  fetch("http://localhost:8080/api/equipment")
    .then((response) => response.json())
    .then((data) => setEquipmentList(data))
    .catch((err) => console.error("Could not load equipment list", err));
}, []);

  function handleChange(e) {
      e.preventDefault()
  console.log('Submit clicked, payload will be:', formData)
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
function handleSubmit(e) {
  e.preventDefault();

  // If a request is already being sent, ignore extra clicks
  if (submittingRef.current) return;
  submittingRef.current = true;
  setIsSubmitting(true);

  const payload = {
    equipmentId: Number(formData.equipmentType),
    customerName: formData.name,
    customerPhone: formData.phone,
    customerEmail: formData.email,
    siteLocation: formData.siteLocation,
    startDate: formData.startDate,
    endDate: formData.endDate,
  };

  fetch("http://localhost:8080/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Booking failed");
      }
      return response.json();
    })
    .then((data) => {
      alert(`Booking request submitted! Reference: ${data.referenceToken}`);
      setFormData({
        name: "",
        phone: "",
        email: "",
        equipmentType: "",
        siteLocation: "",
        startDate: "",
        endDate: "",
      });
    })
    .catch(() => {
      alert("Something went wrong submitting your request. Please try again.");
    })
    .finally(() => {
      // Always unlock, whether it worked or failed
      submittingRef.current = false;
      setIsSubmitting(false);
    });
}
  
const inputClass =
  "w-full min-w-0 bg-slate-100 rounded-lg px-4 py-3 text-base text-slate-900"
  const today = new Date().toISOString().split("T")[0]
  return (
  <main className="bg-slate-900 min-h-screen px-4 sm:px-8 pt-32 pb-16">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
      {/* Left column */}
      <div className="text-white">
        <span className="inline-block text-amber-500 text-xs font-bold tracking-widest px-2 py-1 rounded-full bg-amber-500/10 mb-4">
          BOOKINGS & ENQUIRIES
        </span>

        <h1 className="text-4xl sm:text-5xl font-black mb-6">
          HEAVY
          <br />
          POWER
          <br />
          <span className="text-amber-500">EQUIPMENT.</span>
        </h1>

        <p className="text-slate-300 mb-8 max-w-sm">
          Limpopo-based heavy machinery hire. From excavation to hauling, our
          fleet is ready to deploy within 24 hours of confirmation.
        </p>

        <div className="border-t text-sm tracking-widest mb-2 border-slate-700 pt-6 grid grid-cols-2 sm:grid-cols-2 gap-14">
          <div>
            <p className="text-slate-500 text-xs font-bold tracking-widest mb-2">
              HEADQUARTERS
            </p>
            <p className="font-bold whitespace-nowrap  ">Letaba River Estate </p>
            <p className="text-slate-300">Tzaneen,0850,Limpopo</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold tracking-widest mb-2">
              DIRECT LINES
            </p>
            <a href="tel:0729664090" className="block font-bold hover:text-amber-500">
              072 966 4090
            </a>
            <a href="tel:0150111144" className="block text-slate-300 hover:text-amber-500">
              015 011 1144
            </a>
          </div>
        </div>

        <div className="h-40 sm:h-56 mt-8 opacity-30 rounded-1xl overflow-hidden">
          <img
            src="/hero-excavator.jpg"
            alt="LJ Plant Hire equipment"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right column - the form */}
      <div className="bg-white rounded-1xl overflow-hidden shadow-lg w-full">
        <div className="bg-amber-500 px-5 sm:px-8 py-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            QUICK HIRE REQUEST
          </h2>
          <p className="text-slate-800 font-bold text-sm">
            Instant dispatch queueing system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-5">
          <div>
            <label className="block text-xs font-black text-slate-600 tracking-widest mb-2">
              FULL NAME / COMPANY
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Tshepo Thato"
              className={inputClass}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
            <div>
              <label className="block text-xs font-black text-slate-600 tracking-widest mb-2">
                PHONE NUMBER
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="072 000 0000"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-600 tracking-widest mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@email.com"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-600 tracking-widest mb-2">
              EQUIPMENT TYPE
            </label>
            <select
              name="equipmentType"
              value={formData.equipmentType}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select heavy machinery...</option>
              {equipmentList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-600 tracking-widest mb-2">
              SITE LOCATION
            </label>
            <input
              type="text"
              name="siteLocation"
              value={formData.siteLocation}
              onChange={handleChange}
              placeholder="e.g. Farm Deerpark, Tzaneen"
              className={inputClass}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
            <div>
              <label className="block text-xs font-black text-slate-600 tracking-widest mb-2">
                START DATE
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                min={today}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-600 tracking-widest mb-2">
                END DATE
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                min={formData.startDate || today}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </div>
<button
  type="submit"
  disabled={isSubmitting}
  className="w-full bg-slate-900 text-white font-bold py-4 rounded-lg hover:bg-amber-600 hover:text-slate-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-slate-900 disabled:hover:text-white"
>
  {isSubmitting ? "SENDING..." : "SUBMIT HIRE REQUEST"}
</button>
        </form>
      </div>
    </div>
  </main>
);
}

export default ContactPage;
