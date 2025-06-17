<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const registerForm = ref({
  email: '',
  fullName: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({
  email: '',
  fullName: '',
  password: '',
  confirmPassword: ''
})

const isLoading = ref(false)

// Validaciones
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePassword = (password) => {
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  const hasMinLength = password.length >= 8
  
  return {
    hasNumber,
    hasSpecialChar,
    hasMinLength
  }
}

const validateForm = () => {
  let isValid = true
  errors.value = {
    email: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  }

  // Validar email
  if (!registerForm.value.email) {
    errors.value.email = 'El correo es requerido'
    isValid = false
  } else if (!validateEmail(registerForm.value.email)) {
    errors.value.email = 'Ingrese un correo válido'
    isValid = false
  }

  // Validar nombre completo
  if (!registerForm.value.fullName) {
    errors.value.fullName = 'El nombre completo es requerido'
    isValid = false
  } else if (registerForm.value.fullName.length < 3) {
    errors.value.fullName = 'El nombre debe tener al menos 3 caracteres'
    isValid = false
  }

  // Validar contraseña
  const passwordValidation = validatePassword(registerForm.value.password)
  if (!registerForm.value.password) {
    errors.value.password = 'La contraseña es requerida'
    isValid = false
  } else if (!passwordValidation.hasNumber) {
    errors.value.password = 'La contraseña debe contener al menos un número'
    isValid = false
  } else if (!passwordValidation.hasSpecialChar) {
    errors.value.password = 'La contraseña debe contener al menos un carácter especial'
    isValid = false
  } else if (!passwordValidation.hasMinLength) {
    errors.value.password = 'La contraseña debe tener al menos 8 caracteres'
    isValid = false
  }

  // Validar confirmación de contraseña
  if (!registerForm.value.confirmPassword) {
    errors.value.confirmPassword = 'Confirme su contraseña'
    isValid = false
  } else if (registerForm.value.password !== registerForm.value.confirmPassword) {
    errors.value.confirmPassword = 'Las contraseñas no coinciden'
    isValid = false
  }

  return isValid
}

const handleRegister = async () => {
  if (!validateForm()) return

  isLoading.value = true
  try {
    // Simular registro exitoso
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Guardar datos en localStorage (en un caso real, esto sería una llamada a la API)
    localStorage.setItem('user', JSON.stringify({
      email: registerForm.value.email,
      fullName: registerForm.value.fullName
    }))
    localStorage.setItem('isAuthenticated', 'true')
    
    // Redirigir al dashboard
    router.push('/dashboard')
  } catch (error) {
    console.error('Error en el registro:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h2>Crear una cuenta</h2>
        <p>¿Ya tienes una cuenta? 
          <router-link to="/login" class="text-indigo-600 hover:text-indigo-500">
            Inicia sesión
          </router-link>
        </p>
      </div>
      
      <form @submit.prevent="handleRegister" class="login-form">
        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input
            id="email"
            v-model="registerForm.email"
            type="email"
            required
            placeholder="ejemplo@correo.com"
          />
          <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
        </div>

        <div class="form-group">
          <label for="fullName">Nombre completo</label>
          <input
            id="fullName"
            v-model="registerForm.fullName"
            type="text"
            required
            placeholder="Juan Pérez"
          />
          <p v-if="errors.fullName" class="error-message">{{ errors.fullName }}</p>
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            id="password"
            v-model="registerForm.password"
            type="password"
            required
            placeholder="••••••••"
          />
          <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
          <p class="password-hint">
            La contraseña debe tener al menos 8 caracteres, un número y un carácter especial
          </p>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirmar contraseña</label>
          <input
            id="confirmPassword"
            v-model="registerForm.confirmPassword"
            type="password"
            required
            placeholder="••••••••"
          />
          <p v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</p>
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="login-button"
        >
          <span v-if="isLoading" class="loading-spinner"></span>
          <span v-if="isLoading">Registrando...</span>
          <span v-else>Crear cuenta</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-box {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h2 {
  color: #1a202c;
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #4a5568;
  font-size: 0.875rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #4a5568;
  font-size: 0.875rem;
  font-weight: 500;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.error-message {
  color: #e53e3e;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.password-hint {
  color: #718096;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.login-button {
  background: #667eea;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.login-button:hover:not(:disabled) {
  background: #5a67d8;
  transform: translateY(-1px);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .login-box {
    padding: 1.5rem;
  }
  
  .login-header h2 {
    font-size: 1.5rem;
  }
}
</style> 