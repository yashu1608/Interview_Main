using beckend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;


namespace beckend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JsonController : ControllerBase
    {
        private readonly string _jsonFilePath = "data.json";
            
        [HttpGet("get-data")]
        public async Task<IActionResult> GetData()
        {
            if (!System.IO.File.Exists(_jsonFilePath))
                return NotFound("JSON file not found");

            var json = await System.IO.File.ReadAllTextAsync(_jsonFilePath);
            return Ok(JsonSerializer.Deserialize<object>(json));
        }
                
        [HttpPost("update-data")]
        public async Task<IActionResult> UpdateData([FromBody] UpdateRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.SamplingTime))
                return BadRequest("Invalid request data");

            if (!System.IO.File.Exists(_jsonFilePath))
                return NotFound("JSON file not found");

            var json = await System.IO.File.ReadAllTextAsync(_jsonFilePath);
            var jsonData = JsonSerializer.Deserialize<JsonData>(json);

            if (jsonData == null || jsonData.Datas == null)
                return NotFound("No data available");

            var selectedData = jsonData.Datas.FirstOrDefault(d => d.SamplingTime == request.SamplingTime);
            if (selectedData == null)
                return NotFound("Sampling time not found");

            selectedData.Properties = request.Properties;

            var updatedJson = JsonSerializer.Serialize(jsonData, new JsonSerializerOptions { WriteIndented = true });
            await System.IO.File.WriteAllTextAsync(_jsonFilePath, updatedJson);

            return Ok(new { success = true, message = "Data updated successfully" });

        }
    }
}
