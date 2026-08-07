import React, { useState, useRef, useEffect } from "react";
import {
  User, CalendarDays, CircleUserRound, MapPin, Landmark, Flag,
  Heart, Cross, School, Building2, HelpCircle, Download,
  BriefcaseMedical, Users, ArrowRight
} from "lucide-react";
import { useCreateAdmissionMutation } from "../../redux/api/admissionApi";
import { useNavigate } from "react-router-dom";

export default function AdmissionForm() {
  const [isMobile, setIsMobile] = useState(false);
  const [createAdmission, { isLoading }] =
  useCreateAdmissionMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
  surname: "",
  firstname: "",
  middlename: "",
  dob: "",
  gender: "",
  hometown: "",
  lga: "",
  state: "",
  religion: "",
  denomination: "",
  school: "",
  schoolAddress: "",
  reason: "",
  allergies: "",
  enrolled: "",

  parentName: "",
  parentEmail: "",
  parentPhone: "",
});
  const [selectedClass, setSelectedClass] = useState([]);
  const [documents, setDocuments] = useState({ testimonial: false, results: false, emailLater: false });
  const [errors, setErrors] = useState({});
  const firstErrorRef = useRef(null);

  // Check screen size for responsive
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({...prev, [e.target.name]: '' }));
  };
  const toggleClass = (value) => setSelectedClass((prev) => prev.includes(value)? prev.filter((i) => i!== value) : [...prev, value]);
  const toggleDocument = (name) => setDocuments((prev) => ({...prev, [name]:!prev[name] }));

  const validateForm = () => {
    let newErrors = {};
    const requiredFields = [
  "surname",
  "firstname",
  "dob",
  "gender",
  "hometown",
  "lga",
  "state",
  "school",
  "schoolAddress",
  "reason",
  "allergies",
  "enrolled",

  "parentName",
  "parentEmail",
  "parentPhone",
];
    requiredFields.forEach(field => { if (!formData[field]) newErrors[field] = 'This field is required' });
    if (selectedClass.length === 0) newErrors['class'] = 'Select at least one class';
    if (!documents.testimonial &&!documents.results &&!documents.emailLater) newErrors['documents'] = 'Select at least one option';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     console.log({ formData, selectedClass, documents });
  //     alert("Proceeding to Payment...");
  //   } else {
  //     firstErrorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    firstErrorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    return;
  }

  const payload = {
    firstName: formData.firstname,
    lastName: formData.surname,
    middleName: formData.middlename,

    dateOfBirth: formData.dob,
    gender: formData.gender,

    hometown: formData.hometown,
    lga: formData.lga,
    stateOfOrigin: formData.state,

    religion: formData.religion,
    denomination: formData.denomination,

    previousSchool: formData.school,
    previousSchoolAddress: formData.schoolAddress,

    reasonForLeaving: formData.reason,

    allergies: formData.allergies,

    childrenEnrolled: formData.enrolled,

    classApplyingFor: selectedClass[0],

    documentOptions: Object.keys(documents).filter(
      (key) => documents[key]
    ),

    parentName: formData.parentName,
    parentEmail: formData.parentEmail,
    parentPhone: formData.parentPhone,
  };

  try {
    console.log("Creating admission...");

    const response = await createAdmission(payload).unwrap();

    console.log(response);

    alert(response.message);

      // Save Admission ID for payment later
    localStorage.setItem(
      "admissionId",
      response.data._id
    );

    // Go to Accept Admission page
    navigate("/admissions/AcceptAdmission");
  } catch (err) {
    console.error(err);

    alert(
      err?.data?.message ||
      "Admission submission failed."
    );
  }
};
  // Responsive grid: 1 column on mobile, 2/3 on desktop
  const grid2Style = { display: 'grid', gridTemplateColumns: isMobile? '1fr' : 'repeat(2, 1fr)', gap: '1.5rem' }
  const grid3Style = { display: 'grid', gridTemplateColumns: isMobile? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem' }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile? '1.5rem 1rem' : '3rem 1.5rem' }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#fff',
          borderRadius: '1.5rem',
          boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
          border: '1px solid #e5e7eb',
          padding: isMobile? '1.5rem 1.25rem' : '3rem 2.5rem'
        }}
      >

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>
          Details of Child
        </h2>

        {/* 1. NAME */}
        <Section>
          <FormLabel icon={<User size={16} />} label="Name (Surname first) *" />
          <div style={grid3Style}>
            <Field ref={errors.surname? firstErrorRef : null}>
              <input name="surname" value={formData.surname} onChange={handleChange} style={getInputStyle(errors.surname)} placeholder="Enter surname" />
              <HelperText text="Surname" error={errors.surname} />
            </Field>
            <Field>
              <input name="firstname" value={formData.firstname} onChange={handleChange} style={getInputStyle(errors.firstname)} placeholder="Enter first name" />
              <HelperText text="First Name" error={errors.firstname} />
            </Field>
            <Field>
              <input name="middlename" value={formData.middlename} onChange={handleChange} style={inputStyle} placeholder="Enter middle name" />
              <HelperText text="Middle Name" />
            </Field>
          </div>
        </Section>

        {/* 2. DOB + GENDER */}
        <Section>
          <div style={grid2Style}>
            <Field ref={errors.dob? firstErrorRef : null}>
              <FormLabel icon={<CalendarDays size={16} />} label="Date of Birth (dd/mm/yyyy) *" />
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} style={getInputStyle(errors.dob)} />
              {errors.dob && <ErrorText text={errors.dob} />}
            </Field>
            <Field ref={errors.gender? firstErrorRef : null}>
              <FormLabel icon={<CircleUserRound size={16} />} label="Gender *" />
              <div style={{ display: 'flex', gap: '1.5rem', paddingTop: '0.75rem', flexWrap: 'wrap' }}>
                {["Female", "Male"].map(g => (
                  <label key={g} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#374151', padding: '0.5rem 1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: formData.gender === g? '#FFFBEA' : '#fff' }}>
                    <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} style={{ width: '1rem', height: '1rem', accentColor: '#0B3D91' }} /> {g}
                  </label>
                ))}
              </div>
              {errors.gender && <ErrorText text={errors.gender} />}
            </Field>
          </div>
        </Section>

        {/* 3. LOCATION */}
        <Section>
          <div style={grid3Style}>
            <Field ref={errors.hometown? firstErrorRef : null}><FormLabel icon={<MapPin size={16} />} label="Home Town *" /><input name="hometown" value={formData.hometown} onChange={handleChange} style={getInputStyle(errors.hometown)} placeholder="e.g Lagos" />{errors.hometown && <ErrorText text={errors.hometown} />}</Field>
            <Field ref={errors.lga? firstErrorRef : null}><FormLabel icon={<Landmark size={16} />} label="Local Government Area *" /><input name="lga" value={formData.lga} onChange={handleChange} style={getInputStyle(errors.lga)} placeholder="e.g Ikeja" />{errors.lga && <ErrorText text={errors.lga} />}</Field>
            <Field ref={errors.state? firstErrorRef : null}><FormLabel icon={<Flag size={16} />} label="State of Origin *" /><input name="state" value={formData.state} onChange={handleChange} style={getInputStyle(errors.state)} placeholder="e.g Lagos State" />{errors.state && <ErrorText text={errors.state} />}</Field>
          </div>
        </Section>

        {/* 4. RELIGION */}
        <Section>
          <div style={grid2Style}>
            <Field><FormLabel icon={<Heart size={16} />} label="Religion" /><input name="religion" value={formData.religion} onChange={handleChange} style={inputStyle} placeholder="e.g Christianity" /></Field>
            <Field><FormLabel icon={<Cross size={16} />} label="Denomination" /><input name="denomination" value={formData.denomination} onChange={handleChange} style={inputStyle} placeholder="e.g Catholic" /></Field>
          </div>
        </Section>

        {/* 5. SCHOOL */}
        <Section>
          <div style={grid2Style}>
            <Field ref={errors.school? firstErrorRef : null}><FormLabel icon={<School size={16} />} label="Present School *" /><input name="school" value={formData.school} onChange={handleChange} style={getInputStyle(errors.school)} placeholder="School name" />{errors.school && <ErrorText text={errors.school} />}</Field>
            <Field ref={errors.schoolAddress? firstErrorRef : null}><FormLabel icon={<Building2 size={16} />} label="Address of Present School *" /><textarea name="schoolAddress" value={formData.schoolAddress} onChange={handleChange} rows={4} style={getTextareaStyle(errors.schoolAddress)} placeholder="Full school address" />{errors.schoolAddress && <ErrorText text={errors.schoolAddress} />}</Field>
          </div>
        </Section>

        {/* 6. CLASS */}
        <Section ref={errors.class? firstErrorRef : null}>
          <FormLabel label="Class for Admission *" />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '1rem', paddingTop: '0.75rem' }}>
            {["JS 1","JS 2","JS 3","SS 1","SS 2","SS 3"].map(item => (
              <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#374151', padding: '0.6rem', border: `1px solid ${selectedClass.includes(item)? '#FFD700' : '#e5e7eb'}`, borderRadius: '0.5rem', background: selectedClass.includes(item)? '#FFFBEA' : '#fff' }}>
                <input type="checkbox" checked={selectedClass.includes(item)} onChange={() => toggleClass(item)} style={{ width: '1rem', height: '1rem', accentColor: '#0B3D91' }} /> {item}
              </label>
            ))}
          </div>
          {errors.class && <ErrorText text={errors.class} />}
        </Section>

        {/* 7. REASON + DOCUMENTS */}
        <Section>
          <div style={grid2Style}>
            <Field ref={errors.reason? firstErrorRef : null}><FormLabel icon={<HelpCircle size={16} />} label="Reason for Leaving Current or Last School *" /><textarea name="reason" value={formData.reason} onChange={handleChange} rows={4} style={getTextareaStyle(errors.reason)} placeholder="Brief reason" />{errors.reason && <ErrorText text={errors.reason} />}</Field>
            <Field ref={errors.documents? firstErrorRef : null}>
              <FormLabel icon={<Download size={16} />} label="Testimonial & Exam Results from Last School *" />
              <div style={{ paddingTop: '0.75rem' }}>
                {Object.keys(documents).map(key => (
                  <label key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', color: '#374151', marginBottom: '1rem', padding: '0.5rem', borderRadius: '0.5rem', background: documents[key]? '#FFFBEA' : 'transparent' }}>
                    <input type="checkbox" checked={documents[key]} onChange={() => toggleDocument(key)} style={{ width: '1rem', height: '1rem', marginTop: '0.25rem', accentColor: '#0B3D91' }} />
                    <span>{key === 'testimonial'? 'Testimonial from the School' : key === 'results'? 'Last three Terms Results' : 'I will email these documents to the school'}</span>
                  </label>
                ))}
              </div>
              {errors.documents && <ErrorText text={errors.documents} />}
              <p style={{ fontSize: '0.875rem', color: '#6b7280', fontStyle: 'italic', marginTop: '1rem' }}>Note: Without these documents, your application cannot be considered.</p>
            </Field>
          </div>
        </Section>

        {/* 8. HEALTH + ENROLLED */}
        <Section style={{ marginBottom: '2.5rem' }}>
          <div style={grid2Style}>
            <Field ref={errors.allergies? firstErrorRef : null}>
              <FormLabel icon={<BriefcaseMedical size={16} />} label="Any Allergies/Health Condition? *" />
              <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.75rem', flexWrap: 'wrap' }}>
                {["Yes", "No"].map(opt => (<label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#374151', padding: '0.5rem 1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: formData.allergies === opt? '#FFFBEA' : '#fff' }}><input type="radio" name="allergies" value={opt} checked={formData.allergies === opt} onChange={handleChange} style={{ width: '1rem', height: '1rem', accentColor: '#0B3D91' }} /> {opt}</label>))}
              </div>
              {errors.allergies && <ErrorText text={errors.allergies} />}
            </Field>
            <Field ref={errors.enrolled? firstErrorRef : null}>
              <FormLabel icon={<Users size={16} />} label="Children Enrolled in School? *" />
              <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.75rem', flexWrap: 'wrap' }}>
                {["Yes", "No"].map(opt => (<label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#374151', padding: '0.5rem 1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: formData.enrolled === opt? '#FFFBEA' : '#fff' }}><input type="radio" name="enrolled" value={opt} checked={formData.enrolled === opt} onChange={handleChange} style={{ width: '1rem', height: '1rem', accentColor: '#0B3D91' }} /> {opt}</label>))}
              </div>
              {errors.enrolled && <ErrorText text={errors.enrolled} />}
            </Field>
          </div>
        </Section>

        <Section>
  <h3
    style={{
      fontSize: "1.3rem",
      fontWeight: "700",
      marginBottom: "1rem",
      color: "#1f2937",
    }}
  >
    Parent / Guardian Information
  </h3>

  <div style={grid3Style}>
    <Field>
      <FormLabel label="Parent / Guardian Name *" />
      <input
        name="parentName"
        value={formData.parentName}
        onChange={handleChange}
        style={getInputStyle(errors.parentName)}
        placeholder="Full Name"
      />
      {errors.parentName && <ErrorText text={errors.parentName} />}
    </Field>

    <Field>
      <FormLabel label="Parent Email Address *" />
      <input
        type="email"
        name="parentEmail"
        value={formData.parentEmail}
        onChange={handleChange}
        style={getInputStyle(errors.parentEmail)}
        placeholder="example@gmail.com"
      />
      {errors.parentEmail && <ErrorText text={errors.parentEmail} />}
    </Field>

    <Field>
      <FormLabel label="Parent Phone Number *" />
      <input
        type="tel"
        name="parentPhone"
        value={formData.parentPhone}
        onChange={handleChange}
        style={getInputStyle(errors.parentPhone)}
        placeholder="+234..."
      />
      {errors.parentPhone && <ErrorText text={errors.parentPhone} />}
    </Field>
  </div>
</Section>

        {/* BUTTON */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
         <button
  type="submit"
  disabled={isLoading}
  style={{
    ...buttonStyle,
    opacity: isLoading ? 0.7 : 1,
    cursor: isLoading ? "not-allowed" : "pointer",
  }}

            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0B3D91'; e.currentTarget.style.color = '#FFD700'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFD700'; e.currentTarget.style.color = '#000'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Next <ArrowRight size={22} />
          </button>
        </div>
      </form>
    </div>
  );
}

/* ============= PRO STYLES ============= */
const getInputStyle = (hasError) => ({
  width: '100%',
  borderRadius: '0.5rem',
  border: `2px solid ${hasError? '#ef4444' : '#e5e7eb'}`,
  padding: '0.875rem 1rem',
  outline: 'none',
  transition: 'all 0.2s ease',
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  backgroundColor: '#fff',
  fontSize: '1rem'
});

const getTextareaStyle = (hasError) => ({
...getInputStyle(hasError),
  resize: 'vertical',
  minHeight: '120px'
});

const inputStyle = getInputStyle(false);

const buttonStyle = {
  width: '100%',
  maxWidth: '320px',
  backgroundColor: '#FFD700',
  color: '#000',
  fontWeight: 700,
  padding: '1rem 2.5rem',
  borderRadius: '0.75rem',
  boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
  fontSize: '1.125rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.75rem',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
}

function Section({ children, style = {}, ref }) {
  return <div ref={ref} style={{ marginBottom: '2rem',...style }}>{children}</div>
}
function Field({ children, ref }) {
  return <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>{children}</div>
}
function FormLabel({ icon, label }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#374151', fontSize: '0.875rem' }}>
      {icon} {label}
    </label>
  );
}
function HelperText({ text, error }) {
  return <p style={{ fontSize: '0.75rem', color: error? '#ef4444' : '#6b7280' }}>{error || text}</p>
}
function ErrorText({ text }) {
  return <p style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 500 }}>{text}</p>
}

// GLOBAL FOCUS STYLE FOR YELLOW OUTLINE - Add this to your globals.css
/*
input:focus, textarea:focus {
  border-color: #FFD700!important;
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.3)!important;
}
*/