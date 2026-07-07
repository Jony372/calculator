# Etapa 1: Compilación
FROM golang:1.26-alpine AS builder

WORKDIR /app

# Copiar archivos de configuración de módulos
COPY go.mod ./
# Si usas librerías externas, descomenta la siguiente línea:
# COPY go.sum ./ 
RUN go mod download

# Copiar el código fuente y compilar
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./cmd/api/

# Etapa 2: Ejecución (Contenedor final ligero)
FROM alpine:latest  
RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copiar el binario desde la etapa de compilación
COPY --from=builder /app/main .

EXPOSE 8080

CMD ["./main"]