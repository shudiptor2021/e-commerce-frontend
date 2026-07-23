'use client';

// google login
export const googleAuth = async () => {
    window.location.href =
  "http://localhost:5000/api/v1/users/auth/google";
};