import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { FilterBar } from '../../components/FilterBar';
import { CaseTable } from '../../components/cases/CaseTable';
import { EmptyState } from '../../components/EmptyState';
import { useCases } from '../../hooks/useCases';
import { useLanguage } from '../../hooks/useLanguage';
import { FolderGit2, Download, Plus, Shield } from 'lucide-react';

export const CasesPage: React.FC = () => {
  const { cases } = useCases();
  const { isHindi, isMarathi, isMarathi } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchRef = c.caseRef.toLowerCase().includes(q);
        const matchName = c.personNameMasked.toLowerCase().includes(q);
        const matchDist = c.district.toLowerCase().includes(q);
        const matchBlock = c.block?.toLowerCase().includes(q);
        const matchOfficer = c.assignedOfficerName?.toLowerCase().includes(q);
        if (!matchRef && !matchName && !matchDist && !matchBlock && !matchOfficer) {
          return false;
        }
      }

      // Risk
      if (selectedRisk !== 'all' && c.riskLevel !== selectedRisk) {
        return false;
      }

      // Stage
      if (selectedStage !== 'all' && c.caseStage !== selectedStage) {
        return false;
      }

      // District
      if (selectedDistrict !== 'all' && c.district !== selectedDistrict) {
        return false;
      }

      return true;
    });
  }, [cases, searchQuery, selectedRisk, selectedStage, selectedDistrict]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedRisk('all');
    setSelectedStage('all');
    setSelectedDistrict('all');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={(isMarathi || isHindi) ? 'निगरानी किए जा रहे मामले' : 'Monitored Atrocity Caseload'}
        subtitle={
          (isMarathi || isHindi)
            ? 'अनुसूचित जाति एवं अनुसूचित जनजाति (अत्याचार निवारण) अधिनियम के अंतर्गत सक्रिय मामले'
            : 'All active cases across districts, tracked for distress indicators, witness protection needs, and statutory relief.'
        }
        badge={
          <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-800 text-xs font-bold border border-stone-200 font-mono">
            {filteredCases.length} of {cases.length}
          </span>
        }
      />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedRisk={selectedRisk}
        onRiskChange={setSelectedRisk}
        selectedStage={selectedStage}
        onStageChange={setSelectedStage}
        selectedDistrict={selectedDistrict}
        onDistrictChange={setSelectedDistrict}
        onReset={handleReset}
      />

      {filteredCases.length > 0 ? (
        <CaseTable cases={filteredCases} />
      ) : (
        <EmptyState
          title="No cases match your filters"
          description="Try clearing or changing your search term, district, or risk tier selection."
          action={
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition"
            >
              Reset Filters
            </button>
          }
        />
      )}
    </div>
  );
};
