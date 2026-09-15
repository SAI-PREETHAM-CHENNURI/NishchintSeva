import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import {
  FileText,
  ShieldCheck,
  QrCode,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  Activity,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const HealthRecordsView: React.FC = () => {
  const { currentPatient, diagnosticTests, language } = useApp();
  const t = translations[language];

  const patientTests = diagnosticTests.filter((dt) => dt.patientId === currentPatient.id);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [docName, setDocName] = useState('');
  const [docCategory, setDocCategory] = useState('Lab Report');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setUploadModalOpen(false);
      setDocName('');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-700" />
            <span>{t.recordsTitle}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {t.recordsSubtitle}
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>{t.uploadPaperRecord}</span>
        </button>
      </div>

      {/* ABHA Digital Health ID Card */}
      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl border-2 border-emerald-500/40 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-widest px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-400/30">
                GOVERNMENT OF INDIA • NATIONAL HEALTH AUTHORITY (NHA)
              </span>
            </div>

            <h3 className="text-2xl font-black tracking-wide text-white">
              {currentPatient.name}
            </h3>

            <div className="space-y-0.5 text-xs text-slate-300">
              <p>
                <span className="text-slate-400">ABHA Number:</span>{' '}
                <strong className="font-mono text-emerald-300 tracking-wider text-sm">
                  {currentPatient.abhaId}
                </strong>
              </p>
              <p>
                <span className="text-slate-400">ABHA Address:</span>{' '}
                <span className="font-mono">{currentPatient.name.toLowerCase().replace(/\s+/g, '')}@abdm</span>
              </p>
              <p>
                <span className="text-slate-400">Gender / Age:</span> {currentPatient.gender}, {currentPatient.age} yrs • Blood Group: <strong className="text-red-400">{currentPatient.bloodGroup}</strong>
              </p>
              <p>
                <span className="text-slate-400">Village & District:</span> {currentPatient.village}, {currentPatient.district}, {currentPatient.state}
              </p>
            </div>
          </div>

          {/* QR Code Simulation */}
          <div className="flex flex-col items-center justify-center p-3 bg-white text-slate-900 rounded-2xl shadow-md shrink-0 self-start sm:self-auto">
            <QrCode className="w-24 h-24 text-slate-900" />
            <span className="text-[10px] font-mono font-bold text-slate-600 mt-1">Scan for ABHA EHR</span>
          </div>
        </div>

        {/* Security / Consent Strip */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-emerald-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Patient Consent Active • e-KYC Verified via Aadhar
          </span>
          <span className="text-slate-400">
            PM-JAY Scheme: {currentPatient.pmjayCard ? 'Active / Eligible (₹5 Lakh Cover)' : 'Not Linked'}
          </span>
        </div>
      </div>

      {/* Diagnostic Tests & Lab Reports */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {t.diagnosticLabReports}
            </h3>
            <p className="text-xs text-slate-500">
              Samples collected by ASHA workers or tested at Rampur PHC / Diagnostic Hub
            </p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
            {patientTests.length} Records
          </span>
        </div>

        {patientTests.length === 0 ? (
          <p className="text-xs text-slate-500 italic">No diagnostic orders recorded.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {patientTests.map((test) => (
              <div
                key={test.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl shrink-0 mt-0.5">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{test.testName}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {test.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Facility: {test.facilityName} • Ordered by {test.orderedByDoctor} ({test.orderedDate})
                    </p>
                    {test.resultSummary && (
                      <div className="mt-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-blue-600" />
                        <span>Result: <strong>{test.resultSummary}</strong></span>
                        {test.isAbnormal && (
                          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                            Flagged for Review
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="shrink-0 self-start sm:self-auto">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${
                      test.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : test.status === 'sample_collected'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    ● {test.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Paper Report Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <h3 className="font-black text-lg text-slate-900">Upload Physical Health Record</h3>
            <p className="text-xs text-slate-600 mt-1">
              Take a phone photo or upload existing paper prescription / lab report to link to your ABHA profile.
            </p>

            {uploadSuccess ? (
              <div className="my-6 p-4 bg-emerald-100 text-emerald-900 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-700" />
                <span>Document successfully scanned and added to your Health Locker!</span>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {language === 'te'
                      ? 'పత్రం శీర్షిక / పేరు:'
                      : language === 'hi'
                      ? 'दस्तावेज़ का शीर्षक / नाम:'
                      : language === 'mr'
                      ? 'दस्तऐवजाचे नाव:'
                      : language === 'bn'
                      ? 'নথির শিরোনাম:'
                      : 'Document Title:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    placeholder="e.g., District Hospital Discharge Summary 2026"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {language === 'te'
                      ? 'వర్గం:'
                      : language === 'hi'
                      ? 'श्रेणी:'
                      : language === 'mr'
                      ? 'प्रवर्ग:'
                      : language === 'bn'
                      ? 'বিভাগ:'
                      : 'Category:'}
                  </label>
                  <select
                    value={docCategory}
                    onChange={(e) => setDocCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Lab Report">Pathology / Lab Report</option>
                    <option value="OPD Slip">Doctor OPD Prescription</option>
                    <option value="Discharge">Hospital Discharge Summary</option>
                    <option value="Vaccine">Immunization Card</option>
                  </select>
                </div>

                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50 hover:bg-slate-100 cursor-pointer">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-slate-700">
                    {language === 'te'
                      ? 'ఫోటో తీయడానికి లేదా ఫైల్ ఎంచుకోవడానికి క్లిక్ చేయండి'
                      : language === 'hi'
                      ? 'फ़ोटो लेने या फ़ाइल चुनने के लिए क्लिक करें'
                      : 'Click to capture photo or browse file'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Supports PNG, JPG, PDF up to 10MB</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setUploadModalOpen(false)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    {language === 'te'
                      ? 'లాకర్‌లో సేవ్ చేయండి'
                      : language === 'hi'
                      ? 'लॉकर में सुरक्षित करें'
                      : language === 'mr'
                      ? 'लॉकरमध्ये जतन करा'
                      : language === 'bn'
                      ? 'লকারে সংরক্ষণ করুন'
                      : 'Save to Locker'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
