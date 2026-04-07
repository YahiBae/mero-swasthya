import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HospitalCard from "@/components/HospitalCard";
import ListingFilters from "@/components/ListingFilters";
import CardSkeleton from "@/components/CardSkeleton";
import { hospitals, locations, allDepartments } from "@/data/mockData";

const Hospitals = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return hospitals.filter((h) => {
      const matchSearch = !search || h.name.toLowerCase().includes(search.toLowerCase()) || h.location.toLowerCase().includes(search.toLowerCase());
      const matchLocation = !location || h.city === location;
      const matchDept = !department || h.departments.includes(department);
      return matchSearch && matchLocation && matchDept;
    });
  }, [search, location, department]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="hero-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground">Hospitals</h1>
          <p className="mt-2 text-muted-foreground">Browse top-rated hospitals across Nepal</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <ListingFilters
          searchQuery={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search hospitals..."
          locationFilter={location}
          onLocationChange={setLocation}
          locations={locations}
          extraFilterLabel="Departments"
          extraFilterValue={department}
          onExtraFilterChange={setDepartment}
          extraFilterOptions={allDepartments}
          resultCount={filtered.length}
        />

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => <CardSkeleton key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((h) => (
              <Link key={h.id} to={`/hospitals/${h.id}`}>
                <HospitalCard hospital={h} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg font-medium text-muted-foreground">No hospitals found matching your criteria.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Hospitals;
