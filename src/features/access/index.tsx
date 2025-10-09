import { Heading } from "@/components/Heading";

export default function AccessPage() {
  return (
    <section id="access">
      <Heading title="交通アクセス" />
      <div className="pb-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3289.73635323254!2d132.7777035764939!3d34.45883987300658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x355064223c54cf5d%3A0x1cfe426714fcb543!2z6L-R55W_5aSn5a2m5bel5a2m6YOo!5e0!3m2!1sja!2sjp!4v1758602507340!5m2!1sja!2sjp"
          width="600"
          height="450"
          className="border-4 border-umenobe-dark-blue rounded-md mx-auto w-4/5"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
