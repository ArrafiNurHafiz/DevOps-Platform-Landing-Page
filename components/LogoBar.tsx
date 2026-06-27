export function LogoBar() {
  const logos = [
    { name: "GitHub", slug: "github" },
    { name: "GitLab", slug: "gitlab" },
    { name: "AWS", slug: "amazonwebservices" },
    { name: "Google Cloud", slug: "googlecloud" },
    { name: "Azure", slug: "microsoftazure" },
    { name: "Kubernetes", slug: "kubernetes" },
    { name: "Docker", slug: "docker" },
    { name: "Terraform", slug: "terraform" },
  ];

  return (
    <section className="py-16 border-t border-[#27272a]">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-center text-xs text-[#52525b] font-mono uppercase tracking-widest mb-8">
          Trusted by engineering teams
        </p>
        <div className="overflow-hidden">
          <div className="flex gap-12 items-center animate-marquee w-max">
            {[...logos, ...logos].map((logo, i) => (
              <img
                key={`${logo.slug}-${i}`}
                src={`https://cdn.simpleicons.org/${logo.slug}/a1a1aa`}
                alt={logo.name}
                className="h-6 md:h-7 opacity-50 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
