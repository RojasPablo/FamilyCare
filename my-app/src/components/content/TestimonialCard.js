import Card from "@/components/ui/Card";


export default function TestimonialCard({ quote, author, role }) {
return (
<Card variant="glass" className="h-full">
<blockquote className="text-white/95 text-lg leading-relaxed">“{quote}”</blockquote>
<div className="mt-6">
<div className="text-white/90 font-semibold">{author}</div>
{role && <div className="text-white/70 text-sm">{role}</div>}
</div>
</Card>
);
}