# Use the official Python base image
FROM python:3.10-slim

# Set the working directory
WORKDIR /usr/src/app

# Install system dependencies
# Include netcat-openbsd for database readiness check
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
COPY . .

# Set the port to expose (443 for HTTPS)
EXPOSE 443

# Command to run your application
# Ensure the path to SSL certificates is correct and they are included in your project
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "443", "--ssl-certfile", "cert.pem", "--ssl-keyfile", "key.pem"]
