# Free port 8080 if another backend instance is still running, then start Spring Boot.
$port = 8080

Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue |
  ForEach-Object {
    $procId = $_.OwningProcess
    if ($procId -and $procId -ne 0) {
      Write-Host "Stopping process $procId that is using port $port..."
      Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
    }
  }

Start-Sleep -Seconds 1

if (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) {
  Write-Error "Port $port is still in use. Close the other app and try again."
  exit 1
}

Write-Host "Starting ShopSphere backend on http://localhost:$port ..."
& "$PSScriptRoot\mvnw.cmd" spring-boot:run
