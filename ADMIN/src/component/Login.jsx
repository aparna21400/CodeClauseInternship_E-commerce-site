import React, { useState } from 'react'

const Login = () => {

    return (
        <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#f9fafb'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '400px',
                border: '1px solid #e5e7eb'
            }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                    Admin Panel
                </h1>
                
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ 
                            display: 'block', 
                            fontSize: '14px', 
                            fontWeight: '600',
                            marginBottom: '8px',
                            color: '#374151'
                        }}>
                            Email Address
                        </label>
                        <input 
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '2px solid #d1d5db',
                                borderRadius: '8px',
                                outline: 'none',
                                fontSize: '14px'
                            }}
                            type="email" 
                            placeholder='your@email.com' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            required 
                        />
                    </div>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ 
                            display: 'block', 
                            fontSize: '14px', 
                            fontWeight: '600',
                            marginBottom: '8px',
                            color: '#374151'
                        }}>
                            Password
                        </label>
                        <input 
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '2px solid #d1d5db',
                                borderRadius: '8px',
                                outline: 'none',
                                fontSize: '14px'
                            }}
                            type="password" 
                            placeholder='Enter your password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            required 
                        />
                    </div>
                    
                    <button 
                        type='submit'
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login