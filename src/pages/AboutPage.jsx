
function AboutPage() {
return (

    <main className = "bg-amber-50 px-8 py-30 min-h-screen">
        <div className= "max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
                <div>
                    <div className="w-12 h-1 bg-amber-500 mb-4"></div>

                    
                    <p className="text-amber-600 text-xs font-black tracking-widest mb-1"> 
                        ESTABLISHED EXCELLENCE
                    </p>
                    <h1 className="text-7xl font-black text-slate-900 ">

                        WHO <br /> WE ARE
                      
                    </h1>

                </div>

                <p className="text-slate-800 font-semibold text-lg">
                    LJ Plant Hire is a South African construction and mining equipment provider based in Tzaneen, 
                    Limpopo. We offer reliable, industrial-grade machinery to support construction, 
                    mining, and infrastructure projects across all nine provinces. Our focus is on providing quality equipment,
                     dependable service, and practical solutions that meet the demands of modern worksites.


                </p>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-3  bg-gradient-to-br gap-px bg-slate-900">
                <div className="bg-slate-900 backdrop-blur-md border border-white/10 text-white p-8 transition-colors duration-200 hover:bg-slate-700/50 cursor-pointer"> 

                    <p className="text-amber-500 text-xs font-black tracking-widest mb-3">  01 / EQUIPMENT </p>

                    
            <p className="text-slate-300 font-bold  mb-10">Quality construction and mining machinery built to handle demanding jobs and challenging worksites. </p>
            <p className="text-slate-500 text-xs font-bold tracking-widest">DIFFERENT MACHINE TYPES</p>
                     </div>

                     <div className="bg-slate-900 backdrop-blur-md border border-white/10 text-white p-8 transition-colors duration-200 hover:bg-slate-700/50 cursor-pointer"> 

                    <p className="text-amber-500 text-xs font-black tracking-widest mb-3">02 / FLEXIBLE SOLUTIONS </p>

                    
            <p className="text-slate-300font-bold mb-10">From short-term requirements to long-term projects, we provide hire solutions designed around your operational needs. </p>
            <p className="text-slate-500 text-xs font-bold tracking-widest ">24/7 DISPATCH</p>
                     </div>

                     <div className="bg-slate-900 backdrop-blur-md border border-white/10 text-white p-8 transition-colors duration-200 hover:bg-slate-700/50 cursor-pointer"> 

                    <p className="text-amber-500 text-xs font-black tracking-widest mb-3">  03 / NATIONWIDE SERVICE </p>

                    
            <p className="text-slate-300 font-bold mb-4">Based in Tzaneen and serving clients across South Africa, we deliver dependable equipment where your project needs it. </p>
           <p className="text-slate-500 text-xs font-bold tracking-widest">NATIONWIDE COVERAGE</p>
                     </div>





                  </div>





        </div>







    </main>




)






}

export default AboutPage