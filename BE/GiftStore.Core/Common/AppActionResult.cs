namespace GiftStore.Core.Common;

public class AppActionResult
{
    public bool IsSuccess { get; set; }
    public object? Data { get; set; }
    public string Detail { get; set; }

    public AppActionResult()
    {
        IsSuccess = false;
        Data = default;
        Detail = "";
    }

    //public AppActionResult(object data)
    //{
    //    BuildResult(data);
    //}

    public AppActionResult BuildResult(object data, string detail = "")
    {
        SetInfo(true, detail);
        Data = data;
        return this;
    }
    public AppActionResult BuildError(string detail)
    {
        SetInfo(false, detail);
        return this;
    }
    public AppActionResult SetInfo(bool success, string detail = default)
    {
        IsSuccess = success;
        Detail = detail;
        return this;
    }
}
