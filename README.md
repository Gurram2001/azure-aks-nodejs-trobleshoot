
# 🚀 AKS + Node.js Troubleshooting Project

This project demonstrates how to deploy a Node.js app on **Azure Kubernetes Service (AKS)** and how to **troubleshoot common container issues** such as `CrashLoopBackOff`, image pull failures, and service IP issues.


## 🔁 Clone This Repo

```bash
git clone https://github.com/Gurram2001/azure-aks-nodejs-trobleshoot.git
cd aks-nodejs-troubleshooting
```

## 🧰 Tools & Tech Stack We get

* Azure CLI
* AKS (Azure Kubernetes Service)
* ACR (Azure Container Registry)
* Docker
* Node.js + Express
* Kubernetes YAMLs (Deployment + Service)
* `kubectl`

---

## 📦 Step-by-Step Deployment

---

### ✅ 1. Create Azure Resources

```bash
# Set Variables
RG=aks-node-rg
AKS=aks-node-cluster
ACR=acraksdemo1234 #any unique name.

# Create Resource Group
az group create --name $RG --location eastus

# Create Azure Container Registry
az acr create --name $ACR --resource-group $RG --sku Basic --admin-enabled true

# Create AKS Cluster, Connect AKS to ACR
az aks create --resource-group $RG --name $AKS --node-count 2 --generate-ssh-keys --attach-acr $ACR --node-vm-size standard_d2_v5


# Get AKS Credentials
az aks get-credentials --resource-group $RG --name $AKS
```

---

### 🐳 2. Build and Push Docker Image to ACR
In your app/ directory:
```bash
cd app

az acr login --name $ACR

docker build -t $ACR.azurecr.io/aks-nodejs-api:v1 .

docker push $ACR.azurecr.io/aks-nodejs-api:v1
```

---

### 🚀 3. Deploy to AKS

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get pods
kubectl get service nodejs-service
```

---

## ❌ Sample Issues & Fixes

---

### 1. CrashLoopBackOff

**Cause:** Missing or invalid environment variable (`PORT`).

**How to simulate:**

```yaml
# In deployment.yaml
env:
  - name: PORT
    value: ""
```

**Fix:**

```yaml
env:
  - name: PORT
    value: "3000"
```

Check logs:

```bash
kubectl logs <pod-name>
```

---

### 2. ImagePullBackOff

**Cause:** Typo in image name or ACR not linked to AKS.

**How to simulate:**

```yaml
image: acraksdemo1234.azurecr.io/fake-nodejs:v1
```

**Fix:**

```yaml
image: acraksdemo1234.azurecr.io/aks-nodejs-api:v1
```

Describe pod for error:

```bash
kubectl describe pod <pod-name>
```

---

### 3. Service EXTERNAL-IP Pending

**Cause:** LoadBalancer may not be provisioned.

```bash
kubectl get svc
```

**Fix:** Use port-forward as fallback:

```bash
kubectl port-forward svc/nodejs-service 8080:80
```

Test app at: `http://localhost:8080`

---

## 📘 Bonus

Enable monitoring with Container Insights:

```bash
az aks enable-addons --addons monitoring --name $AKS --resource-group $RG
```

---

## ✅ Summary

You now have:

* A working AKS cluster with Node.js app deployed
* Practical experience fixing `CrashLoopBackOff`, image errors, and networking issues
* A reusable project for interviews and resume
``
