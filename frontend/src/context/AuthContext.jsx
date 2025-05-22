
import { createContext, useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { authAPI } from "../api"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    // Check if user is already logged in on initial load
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const token = localStorage.getItem("token")
                if (token) {
                    const response = await authAPI.getProfile()
                    if (response.data.success) {
                        setUser(response.data.user)
                        setIsAuthenticated(true)
                    } else {
                        // Token invalid or expired
                        localStorage.removeItem("token")
                    }
                }
            } catch (error) {
                console.error("Auth check failed:", error)
                localStorage.removeItem("token")
            } finally {
                setLoading(false)
            }
        }

        checkAuthStatus()
    }, [])

    const login = async (credentials) => {
        try {
            setLoading(true)
            const response = await authAPI.login(credentials)
            if (response.data.success) {
                localStorage.setItem("token", response.data.token)
                setUser(response.data.user)
                setIsAuthenticated(true)
                toast.success("Login successful!")
                navigate("/")
                return true
            } else {
                toast.error(response.data.message || "Login failed")
                return false
            }
        } catch (error) {
            console.error("Login error:", error)
            toast.error(error.response?.data?.message || "Login failed")
            return false
        } finally {
            setLoading(false)
        }
    }

    const signup = async (userData) => {
        try {
            setLoading(true)
            const response = await authAPI.signup(userData)
            if (response.data.success) {
                toast.success("Registration successful! Please login.")
                navigate("/auth?mode=login")
                return true
            } else {
                toast.error(response.data.message || "Registration failed")
                return false
            }
        } catch (error) {
            console.error("Signup error:", error)
            toast.error(error.response?.data?.message || "Registration failed")
            return false
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            await authAPI.logout()
        } catch (error) {
            console.error("Logout error:", error)
        } finally {
            localStorage.removeItem("token")
            setUser(null)
            setIsAuthenticated(false)
            navigate("/")
            toast.success("Logged out successfully")
        }
    }

    const updateProfile = async (userData) => {
        try {
            setLoading(true)
            const response = await authAPI.updateProfile(userData)
            if (response.data.success) {
                setUser(response.data.user)
                toast.success("Profile updated successfully")
                return true
            } else {
                toast.error(response.data.message || "Failed to update profile")
                return false
            }
        } catch (error) {
            console.error("Update profile error:", error)
            toast.error(error.response?.data?.message || "Failed to update profile")
            return false
        } finally {
            setLoading(false)
        }
    }

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
        updateProfile,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
