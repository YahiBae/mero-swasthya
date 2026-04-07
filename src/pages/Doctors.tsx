import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoctorCard from "@/components/DoctorCard";
import ListingFilters from "@/components/ListingFilters";
import CardSkeleton from "@/components/CardSkeleton";
import { doctors, locations, specializations } from "@/data/mockData";
import { DEPARTMENT_CATALOG } from "@/data/siteContent";

const Doctors = () => {
  const [params] = useSearchParams();
  const departmentFromQuery = params.get("department") || "";
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState(departmentFromQuery);

  useEffect(() => {
    setSpecialty(departmentFromQuery);
  }, [departmentFromQuery]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.hospital.toLowerCase().includes(search.toLowerCase());
      const matchLocation = !location || d.city === location;
      const mappedDepartment = DEPARTMENT_CATALOG.find((item) => item.en.toLowerCase() === specialty.toLowerCase());
      const matchSpec = !specialty
        ? true
        : mappedDepartment
          ? mappedDepartment.keywords.some((keyword) => d.specialty.toLowerCase().includes(keyword))
          : d.specialty.toLowerCase().includes(specialty.toLowerCase());
      return matchSearch && matchLocation && matchSpec;
    });
  }, [search, location, specialty]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="hero-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground">Doctors</h1>
          <p className="mt-2 text-muted-foreground">Book appointments with experienced specialists</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <ListingFilters
          searchQuery={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search doctors or hospitals..."
          locationFilter={location}
          onLocationChange={setLocation}
          locations={locations}
          extraFilterLabel="Specialization"
          extraFilterValue={specialty}
          onExtraFilterChange={setSpecialty}
          extraFilterOptions={specializations}
          resultCount={filtered.length}
        />

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => <CardSkeleton key={i} variant="doctor" />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d) => (
              <Link key={d.id} to={`/doctors/${d.id}`}>
                <DoctorCard doctor={d} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg font-medium text-muted-foreground">No doctors found matching your criteria.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Doctors;
