package handlers

type errorMessage struct {
	Success bool `json:"success"`
	Code string `json:"code"`
	Message string `json:"message"`
}