import React, { useRef, useState } from "react";
import {
  Camera,
  Upload,
  Trash2,
} from "lucide-react";

export default function PassportUpload() {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must not exceed 5MB.");
      return;
    }
    const imageURL = URL.createObjectURL(file);
    setPreview(imageURL);
  };

  const removeImage = () => {
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    // OUTER WRAPPER: PADDING TOP, LEFT, RIGHT
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
      paddingTop: '2rem', // TOP PADDING
      paddingLeft: '1.5rem', // LEFT PADDING
      paddingRight: '1.5rem', // RIGHT PADDING
      paddingBottom: '1rem'
    }}>

      {/* Upload Circle */}
      <div
        onClick={() => inputRef.current.click()}
        style={{
          position: 'relative',
          width: '16rem', // w-64
          height: '16rem', // h-64
          borderRadius: '50%',
          border: '4px dashed #d1d5db',
          backgroundColor: '#f3f4f6',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 20px 25px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
        }}
      >
        {preview? (
          <img
            src={preview}
            alt="Passport Preview"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#6b7280',
            textAlign: 'center',
            padding: '1rem' // INNER PADDING SO TEXT DOESN'T TOUCH EDGE
          }}>
            <Camera size={52} style={{ marginBottom: '1rem', transition: 'color 0.3s' }} />
            <p style={{ fontWeight: 600, fontSize: '1rem', color: '#374151' }}>Upload Passport</p>
            <span style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#6b7280' }}>
              JPG, PNG (Max 5MB)
            </span>
          </div>
        )}

        {/* Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          opacity: 0,
          transition: 'opacity 0.3s',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
        onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
        >
          <Upload size={42} style={{ color: '#fff' }} />
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />

      {/* Remove Button */}
      {preview && (
        <button
          onClick={removeImage}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1.25rem', // py-2.5 px-5
            borderRadius: '0.5rem',
            backgroundColor: '#ef4444',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 6px rgba(239, 68, 68, 0.2)',
            fontWeight: 600
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
        >
          <Trash2 size={18} />
          Remove Photo
        </button>
      )}

      {/* Helper Text */}
      <p style={{
        maxWidth: '20rem', // max-w-xs
        textAlign: 'center',
        fontSize: '0.875rem',
        color: '#6b7280',
        lineHeight: '1.5rem',
        paddingTop: '0.5rem' // EXTRA TOP PADDING
      }}>
        Upload a recent passport photograph with a plain background.
        This image will appear on your admission profile.
      </p>
    </div>
  );
}