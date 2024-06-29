import React, { useState } from 'react';
import CrimeReport from '../components/CrimeReport';

const CrimeReportPage = () => {
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    dateFrom: '',
    dateTo: '',
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="City or coordinates"
          />
        </label>
        <label>
          Type:
          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Theft">Theft</option>
            <option value="Vandalism">Vandalism</option>
            <option value="Assault">Assault</option>
            <option value="Robbery">Robbery</option>
            <option value="Burglary">Burglary</option>
          </select>
        </label>
        <label>
          Date From:
          <input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Date To:
          <input
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleFilterChange}
          />
        </label>
      </div>
      <CrimeReport filters={filters} />
    </div>
  );
};

export default CrimeReportPage;
