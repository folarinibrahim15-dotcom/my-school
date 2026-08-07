import React from "react";
import Sidebar from "./Sidebar";
import { HiOutlineXMark } from "react-icons/hi2";

export default function MobileSidebar({

    open,

    onClose,

}) {
      return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(4px)',
                    transition: 'all 300ms ease',
                    zIndex: 40,
                    opacity: open ? 1 : 0,
                    visibility: open ? 'visible' : 'hidden',
                    display: 'block' // lg:hidden equivalent - you control this with parent layout
                }}
            />

            {/* Drawer */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    zIndex: 50,
                    transition: 'transform 300ms ease',
                    transform: open ? 'translateX(0)' : 'translateX(-100%)',
                    display: 'block' // lg:hidden equivalent - you control this with parent layout
                }}
            >
                <div style={{ position: 'relative', height: '100%' }}>
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f1f5f9';
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#ffffff';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                        style={{
                            position: 'absolute',
                            top: '1.25rem',
                            right: '1.25rem',
                            zIndex: 50,
                            borderRadius: '50%',
                            backgroundColor: '#ffffff',
                            padding: '0.5rem',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <HiOutlineXMark size={22} color="#1e293b" />
                    </button>
                    <Sidebar />
                </div>
            </div>
        </>
    );

}