import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClinicCard from "@/components/ClinicCard";
import ListingFilters from "@/components/ListingFilters";
import CardSkeleton from "@/components/CardSkeleton";
import { clinics, locations } from "@/data/mockData";

const clinicTypes = [...new Set(clinics.map((c) => c.type))];

const Clinics = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return clinics.filter((c) => {
      const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.services.some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchLocation = !location || c.city === location;
      const matchType = !type || c.type === type;
      return matchSearch && matchLocation && matchType;
    });
  }, [search, location, type]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="hero-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground">Clinics</h1>
          <p className="mt-2 text-muted-foreground">Find specialized clinics near you</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <ListingFilters
          searchQuery={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search clinics or services..."
          locationFilter={location}
          onLocationChange={setLocation}
          locations={locations}
          extraFilterLabel="Type"
          extraFilterValue={type}
          onExtraFilterChange={setType}
          extraFilterOptions={clinicTypes}
          resultCount={filtered.length}
        />

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => <CardSkeleton key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <Link key={c.id} to={`/clinics/${c.id}`}>
                <ClinicCard clinic={c} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg font-medium text-muted-foreground">No clinics found matching your criteria.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Clinics;
