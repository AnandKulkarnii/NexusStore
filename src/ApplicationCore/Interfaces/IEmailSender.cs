using System.Threading.Tasks;

namespace NexusStore.ApplicationCore.Interfaces;

public interface IEmailSender
{
    Task SendEmailAsync(string email, string subject, string message);
}
