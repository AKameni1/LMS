import { Clock, Mail, MapPin, Phone } from "lucide-react"

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-dark-800 p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-light-100">Contact Information</h2>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-light-100">Main Library</p>
              <p className="text-sm text-light-200">
                University Campus, Building 12
                <br />
                123 Academic Avenue
                <br />
                University City, UC 10001
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-light-100">Phone</p>
              <p className="text-sm text-light-200">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-light-100">Email</p>
              <p className="text-sm text-light-200">library@university.edu</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="mt-1 h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-light-100">Hours</p>
              <div className="text-sm text-light-200">
                <p>Monday - Friday: 8:00 AM - 10:00 PM</p>
                <p>Saturday: 9:00 AM - 8:00 PM</p>
                <p>Sunday: 10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-dark-800 p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-light-100">Department Contacts</h2>

        <div className="space-y-4">
          <div>
            <p className="font-medium text-light-100">Circulation Desk</p>
            <p className="text-sm text-light-200">circulation@university.edu</p>
            <p className="text-sm text-light-200">Ext. 1001</p>
          </div>

          <div>
            <p className="font-medium text-light-100">Reference Services</p>
            <p className="text-sm text-light-200">reference@university.edu</p>
            <p className="text-sm text-light-200">Ext. 1002</p>
          </div>

          <div>
            <p className="font-medium text-light-100">Technical Support</p>
            <p className="text-sm text-light-200">libtech@university.edu</p>
            <p className="text-sm text-light-200">Ext. 1003</p>
          </div>

          <div>
            <p className="font-medium text-light-100">Acquisitions</p>
            <p className="text-sm text-light-200">acquisitions@university.edu</p>
            <p className="text-sm text-light-200">Ext. 1004</p>
          </div>
        </div>
      </div>
    </div>
  )
}

