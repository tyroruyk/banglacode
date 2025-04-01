const Docs = () => {
  return (
    <div className="docs">
      <h2>বাংলাকোড ডকুমেন্টেশন</h2>
      <p>
        বাংলাকোড একটি প্রোগ্রামিং ভাষা যা বাংলা সিনট্যাক্স ব্যবহার করে। এটি প্রোগ্রামিং শেখা এবং বাংলা ভাষায় কোড লেখা সহজ করার জন্য ডিজাইন করা হয়েছে।
      </p>
      <h3>বৈশিষ্ট্য</h3>
      <ul>
        <li>বাংলা ভাষায় সিনট্যাক্স</li>
        <li>সহজ এবং বোধগম্য</li>
        <li>শিক্ষানবিসদের জন্য উপযুক্ত</li>
      </ul>
      <h3>ব্যবহারবিধি</h3>
      <p>
        বাংলাকোড ব্যবহার করার জন্য, আপনাকে নিম্নলিখিত নিয়মগুলি অনুসরণ করতে হবে:
      </p>
      <ol>
        <li>প্রথমে, <code>প্রধান()</code> ফাংশন দিয়ে শুরু করুন।</li>
        <li>ভেরিয়েবল ঘোষণা করার জন্য <code>পূর্ণ</code> (int) এবং <code>দশমিক</code> (float) ব্যবহার করুন।</li>
        <li>যোগ, বিয়োগ, গুণ, ভাগ এবং বর্গমূল করার জন্য যথাক্রমে <code>যোগ()</code>, <code>বিয়োগ()</code>, <code>গুণ()</code>, <code>ভাগ()</code> এবং <code>বর্গমূল()</code> ফাংশন ব্যবহার করুন।</li>
        <li>আউটপুট দেখানোর জন্য <code>ছাপাওফ()</code> ফাংশন ব্যবহার করুন।</li>
      </ol>
      <h3>উদাহরণ</h3>
      <pre>
        <code>
          {`#অন্তর্ভুক্ত <স্তদিও.হ>

পূর্ণ প্রধান() {
    ছাপাওফ("গণনা শুরু!\\n");
    পূর্ণ ক = ১০;
    পূর্ণ খ = ৫;
    দশমিক গ = ৩.৫;
    পূর্ণ ঘ = যোগ(ক, খ);
    ছাপাওফ("যোগ: ");
    ছাপাওফ(ঘ);
    ছাপাওফ("\\n");
    পূর্ণ ঙ = বিয়োগ(ক, খ);
    ছাপাওফ("বিয়োগ: ");
    ছাপাওফ(ঙ);
    ছাপাওফ("\\n");
    দশমিক চ = গুণ(গ, খ);
    ছাপাওফ("গুণ: ");
    ছাপাওফ(চ);
    ছাপাওফ("\\n");
    দশমিক ছ = ভাগ(ক, গ);
    ছাপাওফ("ভাগ: ");
    ছাপাওফ(ছ);
    ছাপাওফ("\\n");
    দশমিক জ = বর্গমূল(ক);
    ছাপাওফ("বর্গমূল: ");
    ছাপাওফ(জ);
    ছাপাওফ("\\n");
    ফেরত ০;
}`}
        </code>
      </pre>
    </div>
  );
};

export default Docs; 