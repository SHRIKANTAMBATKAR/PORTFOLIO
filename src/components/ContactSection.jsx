import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const sectionRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    toast({
      title: "Sending...",
      description: "Please wait while your message is being sent.",
    });

    // auto-submit through hidden form
    e.target.submit();

    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-center">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Let's discuss your next project or opportunity
          </p>

          <div className="grid md:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <p className="text-foreground/80 mb-8 leading-relaxed">
                  I'm always interested in hearing about new projects and opportunities. 
                  Whether you have a question or just want to say hi, feel free to reach out!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a 
                      href="mailto:shrikantambatkar8@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      shrikantambatkar8@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Phone</p>
                    <a 
                      href="tel:8668268460"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +91 8668268460
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Location</p>
                    <p className="text-muted-foreground">Hyderabad, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Instagram className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Instagram</p>
                    <a
                      href="https://www.instagram.com/mr.shrikant_sa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      @mr.shrikant_sa
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border rounded-xl p-8">
              <form 
                onSubmit={handleSubmit}
                action="https://formsubmit.co/shrikantambatkar8@gmail.com"
                method="POST"
                className="space-y-6"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_subject" value="New Portfolio Contact" />

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group"
                >
                  <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
